"use client";

import { useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { gsap, useGSAP, Flip } from "@/lib/gsap";
import { fotos, categorias, type Categoria } from "@/lib/photos";
import Eyebrow from "./film/Eyebrow";

/* A galeria WebGL é pesada — carrega só no cliente, sob demanda. */
const InfiniteGallery = dynamic(() => import("@/components/ui/3d-gallery-photography"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <span className="animate-pulse font-hud text-[10px] uppercase tracking-hud text-film-grey">
        Carregando rolo…
      </span>
    </div>
  ),
});

const filtros = ["Todos", ...categorias] as const;
type Filtro = (typeof filtros)[number];

export default function Portfolio() {
  const raiz = useRef<HTMLElement>(null);
  const [ativo, setAtivo] = useState<Filtro>("Todos");

  const imagens = useMemo(
    () => (ativo === "Todos" ? fotos : fotos.filter((f) => f.categoria === (ativo as Categoria))),
    [ativo],
  );

  // Flip: ao trocar de filtro, o marcador desliza fisicamente entre as abas.
  const trocar = (f: Filtro) => {
    if (f === ativo) return;
    const marcador = raiz.current?.querySelector("[data-marcador]");
    const estado = marcador ? Flip.getState(marcador) : null;
    setAtivo(f);
    if (marcador && estado) {
      requestAnimationFrame(() =>
        Flip.from(estado, { duration: 0.5, ease: "shutter", absolute: true }),
      );
    }
  };

  useGSAP(
    () => {
      gsap.from("[data-cab]", {
        y: 24,
        autoAlpha: 0,
        duration: 0.9,
        ease: "cut",
        stagger: 0.08,
        scrollTrigger: { trigger: raiz.current, start: "top 75%", once: true },
      });
    },
    { scope: raiz },
  );

  return (
    <section
      id="portfolio"
      ref={raiz}
      className="relative"
      style={{ borderTop: "1px solid var(--film-line)" }}
    >
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-28 md:px-14 md:pt-40">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div data-cab>
            <Eyebrow cena="Cena 04">Galeria</Eyebrow>
            <h2 className="font-display text-4xl uppercase leading-[0.9] text-film-white sm:text-5xl">
              O rolo revelado
            </h2>
          </div>

          {/* Abas com marcador Flip */}
          <div data-cab className="flex flex-wrap gap-1">
            {filtros.map((f) => (
              <button
                key={f}
                onClick={() => trocar(f)}
                className="relative px-4 py-2 font-hud text-[10px] uppercase tracking-hud transition-colors duration-300"
                style={{ color: ativo === f ? "#EDEDE8" : "#6B6B6B" }}
              >
                {ativo === f && (
                  <span
                    data-marcador
                    aria-hidden
                    className="absolute inset-x-2 -bottom-px h-px bg-film-white"
                  />
                )}
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Palco WebGL */}
      <div className="relative w-full" style={{ height: "82vh" }}>
        <InfiniteGallery
          images={imagens}
          speed={1.0}
          visibleCount={8}
          className="h-full w-full"
          fadeSettings={{ fadeIn: { start: 0.05, end: 0.22 }, fadeOut: { start: 0.42, end: 0.46 } }}
          blurSettings={{ blurIn: { start: 0.0, end: 0.1 }, blurOut: { start: 0.42, end: 0.46 }, maxBlur: 6.0 }}
        />

        {/* Vinheta — funde a cena no preto */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 82% 82% at 50% 50%, transparent 38%, rgba(5,5,5,0.92) 100%)" }}
        />

        {/* Nome do filtro, grande, atrás dos planos */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-12 mix-blend-difference">
          <p
            key={ativo}
            className="font-display uppercase leading-none text-film-white/80"
            style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
          >
            {ativo}
          </p>
        </div>

        {/* Instrução */}
        <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center font-hud text-[9px] uppercase tracking-hud text-film-grey">
          ← → setas ou role para navegar
        </p>
      </div>
    </section>
  );
}
