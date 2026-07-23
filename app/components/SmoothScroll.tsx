"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, ScrollSmoother, ScrollTrigger, MQ_DESKTOP } from "@/lib/gsap";

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
        const smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.1,          // segundos para "alcançar" o scroll real
          effects: true,        // habilita data-speed / data-lag nos filhos
          normalizeScroll: true,
          ignoreMobileResize: true,
        });

        return () => smoother.kill();
      });

      // Fotos que carregam depois mudam a altura da página.
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);

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

        const smoother = ScrollSmoother.get();
        if (!smoother) return; // mobile: sem smoother, o navegador já resolve

        e.preventDefault();
        smoother.scrollTo(secao, true, "top top");
        history.pushState(null, "", `#${id}`);
      };
      document.addEventListener("click", onClick);

      return () => {
        window.removeEventListener("load", onLoad);
        document.removeEventListener("click", onClick);
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
