"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Eyebrow from "./film/Eyebrow";

const criticas = [
  { texto: "Eu tinha vergonha de tirar foto. Em dez minutos já tava rindo e esqueci que tinha câmera ali.", nome: "Ana Carolina", papel: "Ensaio de casal" },
  { texto: "Fui com duas crianças que não param quietas e achei que ia virar bagunça. Virou o dia mais divertido, e as fotos ficaram lindas.", nome: "Mariana", papel: "Ensaio de família" },
  { texto: "Entregaram antes do prazo e ficou melhor do que eu esperava. Já mandei pra família inteira.", nome: "Rafael e Júlia", papel: "Ensaio de casal" },
  { texto: "A foto do meu filho no colo do pai virou quadro na sala. Minha mãe já pediu uma cópia.", nome: "Beatriz", papel: "Ensaio de família" },
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
      className="relative px-6 py-20 md:py-40 md:px-14"
      style={{ borderTop: "1px solid var(--film-line)" }}
    >
      <div className="mx-auto max-w-4xl">
        <div data-reveal>
          <Eyebrow cena="Cena 06">Crítica</Eyebrow>
        </div>

        <div data-reveal data-cartao className="min-h-[15rem] sm:min-h-[16rem]">
          {/* Archivo, não Anton: uma citação de 5 linhas em fonte display
              vira parede de caixa alta — ilegível no celular. O peso da
              seção vem do tamanho e do respiro, não da fonte. */}
          <blockquote className="font-body text-lg font-medium leading-[1.5] text-film-white sm:text-xl sm:leading-[1.45] lg:text-2xl">
            “{c.texto}”
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <span className="h-px w-8 shrink-0 bg-film-white" aria-hidden />
            <div>
              <p className="font-display text-lg uppercase leading-[0.95] text-film-white">{c.nome}</p>
              <p className="mt-1 font-hud text-[9px] uppercase tracking-hud text-film-grey">{c.papel}</p>
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
              className="flex h-12 w-12 items-center justify-center border border-film-white/25 font-hud text-film-white transition-colors duration-300 hover:bg-film-white hover:text-film-black"
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              onClick={() => ir(i + 1)}
              className="flex h-12 w-12 items-center justify-center border border-film-white/25 font-hud text-film-white transition-colors duration-300 hover:bg-film-white hover:text-film-black"
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
