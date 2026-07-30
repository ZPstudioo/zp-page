"use client";

/**
 * Faixa entre o Hero e o Sobre — a borda de um rolo de filme correndo.
 *
 * A velocidade responde ao scroll (Observer): parado, desliza sozinha
 * devagar; ao rolar, acelera na direção do movimento. É a assinatura de
 * scroll do site, aparecendo aqui pela primeira vez.
 */

import { useRef } from "react";
import { gsap, useGSAP, Observer, MQ_MOTION } from "@/lib/gsap";

const ITENS = ["Casais", "Retratos", "Gestante", "Eventos", "Cacoal", "ZP Studio", "35mm"];

export default function Marquee() {
  const raiz = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const trilha = raiz.current?.querySelector<HTMLElement>("[data-trilha]");
      if (!trilha) return;

      const mm = gsap.matchMedia();

      mm.add(MQ_MOTION, () => {
        // O conteúdo está duplicado; o wrap é em -50% para o laço ser contínuo.
        const largura = trilha.scrollWidth / 2;
        const x = gsap.quickSetter(trilha, "x", "px");
        let pos = 0;
        let base = -0.6;      // deriva ociosa, px/frame
        let impulso = 0;      // empurrão do scroll, decai sozinho

        const tick = () => {
          pos += base + impulso;
          impulso *= 0.9;
          pos = gsap.utils.wrap(-largura, 0, pos);
          x(pos);
        };

        // A faixa fica a oito telas do fim da página. Sem esta trava o ticker
        // continuaria escrevendo um transform por quadro com a seção muito
        // fora da tela — custo perpétuo de CPU e bateria por algo que
        // ninguém está vendo. Só anima enquanto pode ser visto.
        let rodando = false;
        const ligar = () => {
          if (rodando) return;
          rodando = true;
          gsap.ticker.add(tick);
        };
        const desligar = () => {
          if (!rodando) return;
          rodando = false;
          gsap.ticker.remove(tick);
        };

        const naTela = new IntersectionObserver(
          ([entrada]) => (entrada.isIntersecting ? ligar() : desligar()),
          { rootMargin: "120px 0px" },
        );
        if (raiz.current) naTela.observe(raiz.current);

        const obs = Observer.create({
          target: window,
          type: "wheel,touch,scroll",
          onChangeY: (self) => {
            // Parada, a faixa não acumula impulso que ela nunca vai gastar.
            if (!rodando) return;
            impulso = gsap.utils.clamp(-40, 40, -self.deltaY * 0.35);
          },
        });

        return () => {
          naTela.disconnect();
          desligar();
          obs.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: raiz },
  );

  const bloco = ITENS.map((item, i) => (
    <span key={i} className="flex shrink-0 items-center gap-6">
      <span className="font-hud text-[11px] uppercase tracking-hud text-film-grey">{item}</span>
      <span className="h-[3px] w-[3px] shrink-0 bg-film-grey/60" aria-hidden />
    </span>
  ));

  return (
    <div
      ref={raiz}
      aria-hidden
      className="relative overflow-hidden bg-film-black py-4"
      style={{ borderTop: "1px solid var(--film-line)", borderBottom: "1px solid var(--film-line)" }}
    >
      <div data-trilha className="flex w-max gap-6 will-change-transform">
        {bloco}
        {bloco}
        {bloco}
        {bloco}
      </div>
    </div>
  );
}
