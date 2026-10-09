"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ_MOTION } from "@/lib/gsap";

/**
 * Cartela final dos créditos: "ZP Studio" gigante.
 *
 * Ao rolar, o nome é selecionado letra por letra — fundo off-white, letra
 * preta — como quem arrasta o cursor para copiar o título. Cada letra entra
 * de uma vez (sem fade): seleção de texto não tem meio-termo.
 *
 * Reduced-motion recebe o estado final, já selecionado.
 */

const NOME = "ZP Studio";

/* As mesmas cores do `::selection` do globals.css — é a seleção nativa, encenada. */
const SELECIONADA = { backgroundColor: "var(--film-white)", color: "var(--film-black)" };

export default function CartelaFinal() {
  const raiz = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const letras = gsap.utils.toArray<HTMLElement>("[data-letra]");
      const mm = gsap.matchMedia();

      mm.add(MQ_MOTION, () => {
        /* Dispara uma vez, sozinha, quando a cartela entra na tela — no ritmo
           de quem arrasta o cursor sobre o título (~70ms por letra).
           `clamp()`: a cartela mora no fim da página; o gatilho nunca pode
           cair além da rolagem possível. */
        const tl = gsap.timeline({
          scrollTrigger: { trigger: raiz.current, start: "clamp(top 80%)", once: true },
        });
        letras.forEach((l, i) => tl.set(l, SELECIONADA, 0.15 + i * 0.07));
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(letras, SELECIONADA);
      });

      return () => mm.revert();
    },
    { scope: raiz },
  );

  return (
    <p
      ref={raiz}
      aria-label={NOME}
      className="font-display uppercase leading-[0.82] text-film-800"
      style={{ fontSize: "clamp(4rem, 20vw, 18rem)" }}
    >
      {Array.from(NOME).map((c, i) => (
        <span key={i} data-letra aria-hidden>
          {c === " " ? " " : c}
        </span>
      ))}
    </p>
  );
}
