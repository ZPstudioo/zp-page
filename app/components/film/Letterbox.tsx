"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ_MOTION } from "@/lib/gsap";

/**
 * Letterbox — as barras pretas de cinema.
 *
 * Elas não são enfeite: o Hero é uma foto sangrada, e a barra corta a
 * imagem. É o corte que se vê, não a barra. Ao rolar a primeira tela as
 * barras se retraem — "o filme começou".
 *
 * A altura vive na variável CSS --letterbox-h porque o CameraHUD se
 * posiciona dentro das barras e precisa acompanhar a retração.
 */

const alturaBase = () =>
  Math.round(Math.min(34, Math.max(18, window.innerHeight * 0.032)));

const ALTURA_FINAL = 8;

export default function Letterbox() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const raiz = document.documentElement;
      const mm = gsap.matchMedia();

      const aplicar = () => raiz.style.setProperty("--letterbox-h", `${alturaBase()}px`);
      aplicar();
      window.addEventListener("resize", aplicar);

      mm.add(MQ_MOTION, () => {
        const tween = gsap.to(raiz, {
          "--letterbox-h": `${ALTURA_FINAL}px`,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "+=70%",   // some ao longo da primeira tela
            scrub: 0.6,
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          aplicar();
        };
      });

      return () => {
        window.removeEventListener("resize", aplicar);
        mm.revert();
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      <div
        className="absolute inset-x-0 top-0 bg-black"
        style={{ height: "var(--letterbox-h, 24px)", borderBottom: "1px solid var(--film-line)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 bg-black"
        style={{ height: "var(--letterbox-h, 24px)", borderTop: "1px solid var(--film-line)" }}
      />
    </div>
  );
}
