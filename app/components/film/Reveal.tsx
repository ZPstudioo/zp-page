"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ_MOTION } from "@/lib/gsap";

/**
 * Revela os filhos marcados com `data-reveal` quando a seção entra em cena.
 *
 * Um único ScrollTrigger por bloco, em vez de um por elemento — os itens
 * sobem em escada (stagger). Concentra num só lugar o padrão que, de outro
 * modo, se repetiria em toda seção.
 *
 * Reduced motion: nada é escondido, tudo já nasce visível.
 */
export default function Reveal({
  children,
  className,
  id,
  stagger = 0.08,
  y = 26,
  start = "top 82%",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  stagger?: number;
  y?: number;
  start?: string;
}) {
  const raiz = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = raiz.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(MQ_MOTION, () => {
        const alvos = gsap.utils.toArray<HTMLElement>("[data-reveal]", el);
        if (!alvos.length) return;

        const tween = gsap.from(alvos, {
          y,
          autoAlpha: 0,
          duration: 0.9,
          ease: "cut",
          stagger,
          scrollTrigger: { trigger: el, start, once: true },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(alvos, { clearProps: "all" });
        };
      });

      return () => mm.revert();
    },
    { scope: raiz },
  );

  return (
    <div ref={raiz} id={id} className={className}>
      {children}
    </div>
  );
}
