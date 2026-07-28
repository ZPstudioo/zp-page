"use client";

import { useRef, type ReactNode } from "react";
import {
  gsap,
  useGSAP,
  ScrollTrigger,
  MQ_DESKTOP,
  carregarScrollSmoother,
  definirSmoother,
  smootherAtivo,
} from "@/lib/gsap";
import { aparelhoFraco } from "@/lib/dispositivo";
import type { ScrollSmoother as TipoSmoother } from "gsap/ScrollSmoother";

/**
 * Envelope do ScrollSmoother.
 *
 * A estrutura wrapper/content é exigida pelo plugin: ele aplica um
 * `transform` no content para defasar o scroll. Consequência importante —
 * qualquer elemento `position: fixed` (grão, letterbox, HUD, cursor) precisa
 * ficar FORA daqui, senão o transform do pai quebra o fixed.
 *
 * Em toque, o smoother fica desligado: o scroll nativo do celular é melhor
 * que qualquer simulação e não briga com a barra de endereço.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ_DESKTOP, () => {
        // Tela grande não garante máquina boa: o smoother roda um transform
        // por quadro na página inteira e é justamente onde um notebook de
        // entrada engasga. Quem não aguenta fica com o scroll nativo, que
        // nunca trava.
        if (aparelhoFraco()) return;

        // O plugin chega por `import()`: o celular nunca baixa este chunk.
        let vivo = true;
        let instancia: TipoSmoother | null = null;

        carregarScrollSmoother().then((ScrollSmoother) => {
          // A media query pode ter mudado (ou o componente saído) enquanto o
          // chunk vinha — sem isto, criaríamos um smoother órfão.
          if (!vivo) return;
          const s = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.1,          // segundos para "alcançar" o scroll real
            effects: true,        // habilita data-speed / data-lag nos filhos
            normalizeScroll: true,
            ignoreMobileResize: true,
          });
          instancia = s;
          definirSmoother(s); // aplica sozinho a pausa que o Leader já pediu
        });

        return () => {
          vivo = false;
          instancia?.kill();
          definirSmoother(null);
        };
      });

      // Fotos que carregam depois mudam a altura da página.
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);

      // Conteúdo que entra DEPOIS também muda a altura — e o ScrollTrigger
      // guarda as posições de start/end em cache. Sem recalcular, o pin do
      // Processo dispara no lugar errado: a galeria WebGL monta ao rolar,
      // cresce a página em ~140px, e o scroll horizontal fica travado no
      // começo até algo forçar a remedida.
      // Só refaz quando a ALTURA muda de verdade (largura é resize de
      // janela, que o ScrollTrigger já trata sozinho) e com um respiro,
      // para não recalcular a cada quadro durante o mount.
      const conteudo = document.querySelector("#smooth-content");
      let alturaConhecida = conteudo?.getBoundingClientRect().height ?? 0;
      let pendente: number | undefined;

      const observador = new ResizeObserver(() => {
        const altura = conteudo?.getBoundingClientRect().height ?? 0;
        if (Math.abs(altura - alturaConhecida) < 1) return;
        alturaConhecida = altura;
        window.clearTimeout(pendente);
        pendente = window.setTimeout(() => ScrollTrigger.refresh(), 220);
      });
      if (conteudo) observador.observe(conteudo);

      // Com o ScrollSmoother ativo, um `<a href="#id">` comum não rola nada:
      // o smoother é quem passou a controlar a posição real de scroll, e o
      // salto nativo do navegador não sabe conversar com ele. Todo link de
      // âncora do site (Navbar, CTAs, rodapé) dependeria disso sem este
      // intercept — por isso ele mora aqui, uma vez só, para o site inteiro.
      const onClick = (e: MouseEvent) => {
        const alvo = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
        if (!alvo) return;
        const id = alvo.getAttribute("href")?.slice(1);
        if (!id) return;
        const secao = document.getElementById(id);
        if (!secao) return;

        // Mobile — e a janelinha em que o chunk ainda não chegou — caem no
        // salto nativo do navegador, que funciona sozinho.
        const smoother = smootherAtivo();
        if (!smoother) return;

        e.preventDefault();
        smoother.scrollTo(secao, true, "top top");
        history.pushState(null, "", `#${id}`);
      };
      document.addEventListener("click", onClick);

      return () => {
        window.removeEventListener("load", onLoad);
        document.removeEventListener("click", onClick);
        observador.disconnect();
        window.clearTimeout(pendente);
        mm.revert();
      };
    },
    { scope: wrapper },
  );

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content">{children}</div>
    </div>
  );
}
