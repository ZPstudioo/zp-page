"use client";

import { useEffect, useRef } from "react";

/**
 * HUD de câmera — timecode, dados de lente e o ponto de gravação.
 *
 * Fica encostado nas barras do letterbox (lê --letterbox-h) e sobe junto
 * quando elas se retraem.
 *
 * O timecode roda a 24 fps de verdade e é escrito direto no DOM via ref:
 * um setState por frame re-renderizaria a árvore 24×/s por um enfeite.
 */

const pad = (n: number, casas = 2) => String(n).padStart(casas, "0");

function formatar(ms: number) {
  const total = ms / 1000;
  const h = Math.floor(total / 3600) % 24;
  const m = Math.floor(total / 60) % 60;
  const s = Math.floor(total) % 60;
  const f = Math.floor((total % 1) * 24); // 24 quadros por segundo
  return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
}

export default function CameraHUD() {
  const tc = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = tc.current;
    if (!el) return;

    const inicio = performance.now();
    let raf = 0;
    let ultimo = 0;

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - ultimo < 1000 / 24) return;
      ultimo = t;
      el.textContent = formatar(t - inicio);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const linha =
    "pointer-events-none fixed inset-x-0 z-[65] hidden items-center justify-between px-4 md:flex";

  return (
    <div aria-hidden>
      {/* Topo — dentro da barra superior */}
      <div className={linha} style={{ top: 0, height: "var(--letterbox-h, 24px)" }}>
        <span className="font-hud text-[9px] uppercase tracking-hud text-film-grey">
          ZP·STUDIO
        </span>
        <span className="flex items-center gap-2 font-hud text-[9px] uppercase tracking-hud text-film-grey">
          <span className="h-1.5 w-1.5 rounded-full bg-rec animate-blink" />
          REC
        </span>
      </div>

      {/* Base — dentro da barra inferior */}
      <div className={linha} style={{ bottom: 0, height: "var(--letterbox-h, 24px)" }}>
        <span
          ref={tc}
          className="font-hud text-[9px] tabular-nums tracking-hud text-film-grey"
        >
          00:00:00:00
        </span>
        <span className="font-hud text-[9px] uppercase tracking-hud text-film-grey">
          ISO 400 · 35MM · f/1.4
        </span>
      </div>
    </div>
  );
}
