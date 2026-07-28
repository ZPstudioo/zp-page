"use client";

/**
 * Registro central do GSAP.
 * Todo componente que anima importa daqui — nunca de "gsap" direto —
 * para garantir que os plugins estejam registrados uma única vez.
 */

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Observer } from "gsap/Observer";
import { CustomEase } from "gsap/CustomEase";
/* Só o tipo — `import type` é apagado na compilação, então isto não
   arrasta o plugin de volta para o bundle principal. */
import type { ScrollSmoother as TipoSmoother } from "gsap/ScrollSmoother";

/* Dois plugins não entram aqui de propósito, e são carregados sob demanda
   mais abaixo:
     · ScrollSmoother — o único que o celular nunca usa (só existe atrás
       de MQ_DESKTOP);
     · Flip (25KB, o segundo maior) — só roda quando alguém CLICA num
       filtro da galeria. Não faz sentido pagá-lo na hidratação de todo
       mundo, inclusive de quem nunca rola até lá.
   Observer e SplitText ficam: os dois animam já na primeira tela, em
   qualquer aparelho, e separá-los só custaria um round-trip. */

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    SplitText,
    Observer,
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

/* ── ScrollSmoother sob demanda ──────────────────────────────────
   O plugin custa ~13KB comprimidos que o celular nunca executa. Quem
   precisa dele é só o <SmoothScroll>, e só no desktop — então ele vira
   um chunk à parte, baixado depois que a media query já liberou.

   O registro abaixo existe por causa de uma corrida real: o Leader manda
   pausar o scroll ~imediatamente, e nessa hora o módulo pode nem ter
   chegado. Guardar a INTENÇÃO de pausa (e não só a instância) faz o
   estado ser aplicado assim que o smoother nasce, em qualquer ordem.   */

let smoother: TipoSmoother | null = null;
let pausaDesejada = false;

export async function carregarScrollSmoother() {
  const mod = await import("gsap/ScrollSmoother");
  gsap.registerPlugin(mod.ScrollSmoother);
  return mod.ScrollSmoother;
}

/** Chamado pelo <SmoothScroll> ao criar/destruir a instância. */
export function definirSmoother(instancia: TipoSmoother | null) {
  smoother = instancia;
  instancia?.paused(pausaDesejada);
}

/** Trava o scroll. Funciona antes do smoother existir e no mobile (sem ele). */
export function pausarScroll(pausar: boolean) {
  pausaDesejada = pausar;
  smoother?.paused(pausar);
}

/** A instância viva, ou `null` no mobile e enquanto o chunk não chegou. */
export function smootherAtivo() {
  return smoother;
}

/* ── Flip sob demanda ────────────────────────────────────────────
   Aquecido pela galeria quando a seção se aproxima da tela, muito antes
   de o dedo alcançar um filtro — então o usuário nunca vê a diferença,
   e quem não chega lá nunca baixa os 25KB.                          */

/* A classe em si, não uma instância — `getState`/`from` são estáticos.
   `typeof import(...)` é só tipo: some na compilação. */
let flip: typeof import("gsap/Flip").Flip | null = null;

export async function carregarFlip() {
  if (flip) return flip;
  const mod = await import("gsap/Flip");
  gsap.registerPlugin(mod.Flip);
  flip = mod.Flip;
  return flip;
}

/** O Flip já carregado, ou `null` — quem chama anima sem ele nesse caso. */
export function flipPronto() {
  return flip;
}

export { gsap, useGSAP, ScrollTrigger, SplitText, Observer, CustomEase };
