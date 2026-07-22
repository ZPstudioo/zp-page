"use client";

import { useEffect, useRef } from "react";

/**
 * Grão de filme.
 *
 * Duas decisões que fazem a diferença entre "grão" e "ruído de JPEG":
 *
 * 1. A cadência é de 12 fps, não 60. Grão a 60 fps parece chuvisco de TV
 *    digital; a 12 fps parece projeção. O olho lê como película.
 * 2. O tile tem 128px e se repete. Gerar ruído do tamanho da tela a cada
 *    frame derrubaria o scroll — aqui são 6 tiles pré-renderizados que
 *    entram em rodízio, custo praticamente zero depois do mount.
 */

const TILE = 128;
const FRAMES = 6;
const FPS = 12;
const INTERVALO = 1000 / FPS;

function gerarTile(): string {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = TILE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const img = ctx.createImageData(TILE, TILE);
  const { data } = img;

  for (let i = 0; i < data.length; i += 4) {
    // Grão monocromático: mesmo valor nos três canais, senão vira ruído colorido.
    const v = (Math.random() * 255) | 0;
    data[i] = data[i + 1] = data[i + 2] = v;
    data[i + 3] = 26; // ~10% — o overlay por cima reduz mais ainda
  }

  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL("image/png");
}

export default function FilmGrain() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Quem pediu menos movimento não recebe grão animado.
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Em telas pequenas o grão é imperceptível e custa bateria.
    const telaPequena = window.matchMedia("(max-width: 767px)");
    if (semMovimento.matches || telaPequena.matches) return;

    const tiles = Array.from({ length: FRAMES }, gerarTile).filter(Boolean);
    if (!tiles.length) return;

    let raf = 0;
    let ultimo = 0;
    let i = 0;

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - ultimo < INTERVALO) return;
      ultimo = t;
      i = (i + 1) % tiles.length;
      el.style.backgroundImage = `url(${tiles[i]})`;
    };

    el.style.backgroundImage = `url(${tiles[0]})`;
    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70] hidden opacity-[0.5] mix-blend-overlay md:block"
      style={{ backgroundRepeat: "repeat", backgroundSize: `${TILE}px ${TILE}px` }}
    />
  );
}
