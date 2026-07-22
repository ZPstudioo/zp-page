"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Eyebrow from "./film/Eyebrow";

const criticas = [
  { texto: "Não sabia posar e no fim nem percebi a câmera. As fotos são a gente de verdade — não uma versão ensaiada da gente.", nome: "Ana Carolina", papel: "Ensaio de casal" },
  { texto: "Chorei quando abri a galeria. Cada foto tem a luz certa, o gesto certo. Parece que ele estava vendo o que a gente sentia.", nome: "Mariana Costa", papel: "Gestante" },
  { texto: "O casamento inteiro está ali, sem clichê, sem foto de banco. Gente olhando e dizendo: isso sim é fotografia.", nome: "Rafael & Júlia", papel: "Casamento" },
  { texto: "Precisava de um retrato pro trabalho e saí com uma série que finalmente parece comigo. Cuidado em cada detalhe.", nome: "Beatriz Mendonça", papel: "Retrato" },
];

export default function Testimonials() {
  const raiz = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);

  // Troca com dissolve, sem depender de biblioteca de presença.
  const ir = (destino: number) => {
    const n = (destino + criticas.length) % criticas.length;
    if (n === i) return;
    const cartao = raiz.current?.querySelector<HTMLElement>("[data-cartao]");
    if (!cartao) return setI(n);
    gsap.to(cartao, {
      autoAlpha: 0,
      y: -12,
      duration: 0.3,
      ease: "shutter",
      onComplete: () => {
        setI(n);
        gsap.fromTo(cartao, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "cut" });
      },
    });
  };

  useGSAP(
    () => {
      gsap.from("[data-reveal]", {
        y: 26,
        autoAlpha: 0,
        duration: 0.9,
        ease: "cut",
        stagger: 0.1,
        scrollTrigger: { trigger: raiz.current, start: "top 72%", once: true },
      });
    },
    { scope: raiz },
  );

  const c = criticas[i];

  return (
    <section
      id="depoimentos"
      ref={raiz}
      className="relative px-6 py-28 md:py-40 md:px-14"
      style={{ borderTop: "1px solid var(--film-line)" }}
    >
      <div className="mx-auto max-w-4xl">
        <div data-reveal>
          <Eyebrow cena="Cena 06">Crítica</Eyebrow>
        </div>

        <div data-reveal data-cartao className="min-h-[16rem]">
          <blockquote className="font-display text-3xl uppercase leading-[1.05] text-film-white sm:text-4xl lg:text-5xl">
            “{c.texto}”
          </blockquote>
          <div className="mt-10 flex items-center gap-4">
            <span className="h-px w-8 bg-film-white" aria-hidden />
            <div>
              <p className="font-body text-sm text-film-white">{c.nome}</p>
              <p className="mt-0.5 font-hud text-[9px] uppercase tracking-hud text-film-grey">{c.papel}</p>
            </div>
          </div>
        </div>

        {/* Controles */}
        <div
          data-reveal
          className="mt-12 flex items-center justify-between pt-6"
          style={{ borderTop: "1px solid var(--film-line)" }}
        >
          <span className="font-hud text-[11px] tabular-nums tracking-hud text-film-grey">
            {String(i + 1).padStart(2, "0")} / {String(criticas.length).padStart(2, "0")}
          </span>
          <div className="flex gap-3">
            <button
              onClick={() => ir(i - 1)}
              className="flex h-10 w-10 items-center justify-center border border-film-white/25 font-hud text-film-white transition-colors duration-300 hover:bg-film-white hover:text-film-black"
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              onClick={() => ir(i + 1)}
              className="flex h-10 w-10 items-center justify-center border border-film-white/25 font-hud text-film-white transition-colors duration-300 hover:bg-film-white hover:text-film-black"
              aria-label="Próximo"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
