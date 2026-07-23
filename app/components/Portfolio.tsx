"use client";

import { useState, useRef, useMemo, useEffect, type RefObject } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { gsap, useGSAP, Flip, MQ_DESKTOP } from "@/lib/gsap";
import { fotos, categorias, type Categoria, type Foto } from "@/lib/photos";
import Eyebrow from "./film/Eyebrow";

/* A galeria WebGL é pesada (three.js, ~870KB) — carrega só no cliente,
   e só é montada de fato quando `usar3D` libera (ver useGaleria3D). */
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

/**
 * Decide se a cena 3D deve existir.
 *
 * Duas travas, as duas têm que liberar:
 *   1. `MQ_DESKTOP` — tela grande e sem "reduzir movimento". Celular nunca
 *      passa daqui, então o chunk do three.js nem é baixado.
 *   2. IntersectionObserver — só monta quando a seção está a ~600px de
 *      entrar na tela. Ninguém paga o custo do WebGL por uma seção que
 *      talvez nunca role até ser vista.
 */
function useGaleria3D(ref: RefObject<HTMLElement | null>) {
  const [desktop, setDesktop] = useState(false);
  const [perto, setPerto] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MQ_DESKTOP);
    const aplicar = () => setDesktop(mq.matches);
    aplicar();
    mq.addEventListener("change", aplicar);
    return () => mq.removeEventListener("change", aplicar);
  }, []);

  useEffect(() => {
    // Já perto: não há mais nada a observar — ver comentário abaixo sobre
    // por que "perto" nunca volta a false.
    const el = ref.current;
    if (!el || !desktop || perto) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // Trava em "true" e para de observar. Se deixássemos o observer
        // vivo, a própria troca de TiraNativa → WebGL muda a altura da
        // seção, o que dispara o observer de novo com `isIntersecting:
        // false` no meio da transição — e o canvas nunca chega a montar.
        setPerto(true);
        obs.disconnect();
      },
      { rootMargin: "600px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, desktop, perto]);

  return desktop && perto;
}

export default function Portfolio() {
  const raiz = useRef<HTMLElement>(null);
  const [ativo, setAtivo] = useState<Filtro>("Todos");
  const usar3D = useGaleria3D(raiz);

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
      <div className="mx-auto max-w-7xl px-6 pb-6 pt-20 md:px-14 md:pt-40">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div data-cab>
            <Eyebrow cena="Cena 04">Galeria</Eyebrow>
            <h2 className="font-display text-4xl uppercase leading-[0.9] text-film-white sm:text-5xl sm:leading-[0.9]">
              O rolo revelado
            </h2>
          </div>

          {/* Abas com marcador Flip. Rolam na horizontal no mobile em vez de
              quebrar em duas fileiras, e cada uma tem 44px de altura de toque. */}
          <div
            data-cab
            className="no-scrollbar -mx-6 flex gap-1 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
          >
            {filtros.map((f) => (
              <button
                key={f}
                onClick={() => trocar(f)}
                className="relative flex min-h-[44px] shrink-0 items-center px-4 font-hud text-[11px] uppercase tracking-hud transition-colors duration-300"
                style={{ color: ativo === f ? "#EDEDE8" : "#6B6B6B" }}
              >
                {ativo === f && (
                  <span
                    data-marcador
                    aria-hidden
                    className="absolute inset-x-2 bottom-0 h-px bg-film-white"
                  />
                )}
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {usar3D ? (
        /* ── Desktop: o palco WebGL ─────────────────────────────── */
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

          <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center font-hud text-[9px] uppercase tracking-hud text-film-grey">
            ← → setas ou role para navegar
          </p>
        </div>
      ) : (
        /* ── Mobile (e reduced-motion): rolo nativo ─────────────── */
        <TiraNativa fotos={imagens} />
      )}
    </section>
  );
}

/** Faixa horizontal com scroll nativo — o toque do celular já é melhor
 *  que qualquer simulação, então não se tenta imitar o efeito 3D aqui. */
function TiraNativa({ fotos: lista }: { fotos: Foto[] }) {
  const [visivel, setVisivel] = useState(1);
  const trilho = useRef<HTMLDivElement>(null);

  // Qual foto está no centro da tela — alimenta o contador "03 / 18".
  // `onScroll` é barato aqui: só escreve um número, sem tocar no layout.
  const aoRolar = () => {
    const el = trilho.current;
    if (!el) return;
    const largura = el.scrollWidth / lista.length;
    setVisivel(Math.min(lista.length, Math.round(el.scrollLeft / largura) + 1));
  };

  return (
    <div className="relative">
      <div
        ref={trilho}
        onScroll={aoRolar}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-6 pt-2"
      >
        {lista.map((f, i) => (
          <div
            key={f.src + i}
            className="halation relative shrink-0 snap-start overflow-hidden bg-film-900"
            style={{ width: "min(78vw, 340px)", aspectRatio: f.ratio }}
          >
            <Image
              src={f.src}
              alt={f.alt}
              fill
              sizes="(max-width: 767px) 78vw, 340px"
              /* As três primeiras chegam com o resto da tela; o restante
                 só baixa quando o dedo chega perto. */
              loading={i < 3 ? "eager" : "lazy"}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between px-6 pb-10">
        <span className="font-hud text-[10px] uppercase tracking-hud text-film-grey">
          deslize →
        </span>
        <span className="font-hud text-[10px] tabular-nums tracking-hud text-film-400">
          {String(visivel).padStart(2, "0")} / {String(lista.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
