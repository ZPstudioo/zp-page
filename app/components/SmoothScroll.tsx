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

      return () => {
        window.removeEventListener("load", onLoad);
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
