"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, MQ_DESKTOP } from "@/lib/gsap";
import Eyebrow from "./film/Eyebrow";

const etapas = [
  { n: "01", titulo: "Briefing", desc: "Conversa antes da câmera. Referência, clima, o que não pode faltar. O ensaio começa aqui." },
  { n: "02", titulo: "Ensaio", desc: "Direção de luz e de gesto. Você relaxa; o resto é comigo. Nada de pose congelada." },
  { n: "03", titulo: "Seleção", desc: "Do bruto ao corte final. Só passa o frame que merece — o descarte é parte do trabalho." },
  { n: "04", titulo: "Tratamento", desc: "Cor, contraste e pele, quadro a quadro. Sem filtro de prateleira, sem plástico." },
  { n: "05", titulo: "Entrega", desc: "Galeria privada em alta resolução, pronta para guardar a vida inteira." },
];

export default function Process() {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = raiz.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      // Desktop: a seção prende e as etapas passam na horizontal, como
      // rodar o filme quadro a quadro na mesa de edição.
      mm.add(MQ_DESKTOP, () => {
        const trilho = el.querySelector<HTMLElement>("[data-trilho]");
        if (!trilho) return;

        const distancia = trilho.scrollWidth - window.innerWidth;

        const tween = gsap.to(trilho, {
          x: -distancia,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${distancia}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        // A barra de progresso acompanha o avanço do rolo.
        const barra = el.querySelector<HTMLElement>("[data-barra]");
        const prog = barra
          ? gsap.to(barra, {
              scaleX: 1,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top top", end: () => `+=${distancia}`, scrub: 0.8 },
            })
          : null;

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          prog?.scrollTrigger?.kill();
          prog?.kill();
        };
      });

      // Mobile: reveal simples, empilhado (a rota nativa vertical é melhor).
      mm.add("(max-width: 767px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-etapa]", el);
        const t = gsap.from(cards, {
          y: 30,
          autoAlpha: 0,
          duration: 0.8,
          ease: "cut",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 70%", once: true },
        });
        return () => {
          t.scrollTrigger?.kill();
          t.kill();
        };
      });

      return () => {
        mm.revert();
        ScrollTrigger.refresh();
      };
    },
    { scope: raiz },
  );

  return (
    <section
      id="processo"
      ref={raiz}
      className="relative overflow-hidden md:h-screen"
      style={{ borderTop: "1px solid var(--film-line)" }}
    >
      {/* Cabeçalho fixo dentro do pin */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-6 pt-24 md:px-14 md:pt-28">
        <Eyebrow cena="Cena 05">Processo</Eyebrow>
        <h2 className="font-display text-4xl uppercase leading-[0.9] text-film-white sm:text-5xl">
          Do bruto ao corte
        </h2>
      </div>

      {/* Trilho horizontal (desktop) / coluna (mobile) */}
      <div
        data-trilho
        className="flex flex-col gap-6 px-6 py-28 md:h-full md:flex-row md:items-center md:gap-0 md:px-0 md:py-0"
        style={{ width: "max-content" }}
      >
        {/* Espaçador para o primeiro card não colar no cabeçalho (desktop) */}
        <div className="hidden md:block md:w-[42vw] md:shrink-0" aria-hidden />

        {etapas.map((e) => (
          <article
            data-etapa
            key={e.n}
            className="shrink-0 md:flex md:h-full md:w-[38vw] md:flex-col md:justify-center md:px-14"
            style={{ borderLeft: "1px solid var(--film-line)" }}
          >
            <div className="pl-6 md:pl-0">
              <span className="font-hud text-[11px] tracking-hud text-film-grey">{e.n} / 05</span>
              <h3 className="mt-4 font-display text-5xl uppercase leading-none text-film-white md:text-7xl">
                {e.titulo}
              </h3>
              <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-film-grey">
                {e.desc}
              </p>
            </div>
          </article>
        ))}

        <div className="hidden md:block md:w-[20vw] md:shrink-0" aria-hidden />
      </div>

      {/* Barra de progresso (desktop) */}
      <div className="absolute inset-x-0 bottom-10 z-10 mx-14 hidden md:block" aria-hidden>
        <div className="h-px w-full bg-film-line">
          <div data-barra className="h-px w-full origin-left scale-x-0 bg-film-white" />
        </div>
      </div>
    </section>
  );
}
