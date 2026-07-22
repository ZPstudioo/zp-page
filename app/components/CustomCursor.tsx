"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ_FINE } from "@/lib/gsap";

/**
 * Cursor — retículo de foco automático.
 *
 * Quatro cantos, como o quadro de AF de uma câmera. Parado, ele fica
 * aberto e discreto. Sobre algo clicável, os cantos fecham: a câmera
 * travou o foco. Nada de bolinha colorida.
 *
 * Movimento por `gsap.quickTo` — reaproveita o mesmo tween a cada
 * mousemove em vez de criar um novo; é o caminho barato o suficiente
 * para rodar em todo movimento do mouse sem sujar o frame.
 *
 * A delegação de eventos é no document: elementos que aparecem depois
 * (filtros da galeria, itens revelados no scroll) funcionam sem re-bind.
 */

const CANTOS = [
  "left-0 top-0 border-l border-t",
  "right-0 top-0 border-r border-t",
  "left-0 bottom-0 border-l border-b",
  "right-0 bottom-0 border-r border-b",
];

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ_FINE, () => {
        const alvo = ref.current;
        if (!alvo) return;

        const cantos = gsap.utils.toArray<HTMLElement>(".af-corner", alvo);

        // O GSAP passa a ser dono do `transform` — a centragem tem que vir
        // daqui, não de classe utilitária, senão uma sobrescreve a outra.
        gsap.set(alvo, { xPercent: -50, yPercent: -50 });

        const x = gsap.quickTo(alvo, "x", { duration: 0.25, ease: "power3" });
        const y = gsap.quickTo(alvo, "y", { duration: 0.25, ease: "power3" });

        let apareceu = false;

        const mover = (e: MouseEvent) => {
          x(e.clientX);
          y(e.clientY);
          if (!apareceu) {
            apareceu = true;
            gsap.to(alvo, { autoAlpha: 1, duration: 0.4 });
          }
        };

        // Foco travado: o quadro encolhe e os cantos avançam para dentro.
        const travar = (travado: boolean) => {
          gsap.to(alvo, { scale: travado ? 0.62 : 1, duration: 0.3, ease: "dolly" });
          gsap.to(cantos, { width: travado ? 12 : 7, height: travado ? 12 : 7, duration: 0.3 });
        };

        const clicavel = (t: EventTarget | null) =>
          t instanceof Element && !!t.closest("a, button, [role='button'], [data-cursor]");

        const over = (e: MouseEvent) => clicavel(e.target) && travar(true);
        const out  = (e: MouseEvent) => clicavel(e.target) && travar(false);
        const sair = () => gsap.to(alvo, { autoAlpha: 0, duration: 0.25 });
        const voltar = () => gsap.to(alvo, { autoAlpha: 1, duration: 0.25 });

        window.addEventListener("mousemove", mover);
        document.addEventListener("mouseover", over);
        document.addEventListener("mouseout", out);
        document.addEventListener("mouseleave", sair);
        document.addEventListener("mouseenter", voltar);

        return () => {
          window.removeEventListener("mousemove", mover);
          document.removeEventListener("mouseover", over);
          document.removeEventListener("mouseout", out);
          document.removeEventListener("mouseleave", sair);
          document.removeEventListener("mouseenter", voltar);
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-9 w-9 opacity-0 md:block"
      style={{ willChange: "transform" }}
    >
      {CANTOS.map((pos) => (
        <span
          key={pos}
          className={`af-corner absolute h-[7px] w-[7px] border-film-white/70 ${pos}`}
        />
      ))}
    </div>
  );
}
