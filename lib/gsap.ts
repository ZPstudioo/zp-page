"use client";

/**
 * Registro central do GSAP.
 * Todo componente que anima importa daqui — nunca de "gsap" direto —
 * para garantir que os plugins estejam registrados uma única vez.
 */

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { Observer } from "gsap/Observer";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    ScrollSmoother,
    SplitText,
    Observer,
    Flip,
    CustomEase,
  );

  /* ── Eases da casa ──────────────────────────────────────────
     Um filme não tem bounce. Tem corte e deslize.               */
  CustomEase.create("cut", "0.16, 1, 0.3, 1");        // reveals — sai forte, assenta
  CustomEase.create("dolly", "0.65, 0, 0.35, 1");     // movimentos de câmera
  CustomEase.create("shutter", "0.83, 0, 0.17, 1");   // wipes e cortes

  gsap.defaults({ ease: "cut", duration: 0.9 });
}

/** Desktop com mouse de verdade — libera cursor custom, WebGL, smoother. */
export const MQ_FINE = "(hover: hover) and (pointer: fine)";
/** Tudo que é caro fica atrás disso. */
export const MQ_DESKTOP = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
/** Respeito total a quem pediu menos movimento. */
export const MQ_MOTION = "(prefers-reduced-motion: no-preference)";

export { gsap, useGSAP, ScrollTrigger, ScrollSmoother, SplitText, Observer, Flip, CustomEase };
