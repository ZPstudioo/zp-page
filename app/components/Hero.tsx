"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, SplitText, ScrollTrigger, MQ_FINE, MQ_MOTION } from "@/lib/gsap";
import { heroFoto } from "@/lib/photos";
import { aoLiberarPalco } from "./film/leader-bus";

/**
 * Hero — o primeiro frame.
 *
 * Uma foto sangrada, cortada pelo letterbox, e três palavras que entram
 * por baixo de uma máscara. Nada de card, nada de gradiente colorido.
 *
 * Três camadas empilhadas, cada uma com um dono do `transform`:
 *   [data-speed]  → ScrollSmoother (parallax de scroll)
 *   [data-mouse]  → mouse (deriva suave)
 *   [data-zoom]   → ScrollTrigger (o zoom out)
 * Misturar dois donos no mesmo elemento é como um deles perde a briga.
 */

const TITULO = ["Fotografia", "que", "respira."];

export default function Hero() {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const secao = raiz.current;
      if (!secao) return;

      const mm = gsap.matchMedia();
      let cancelado = false;
      let split: SplitText | null = null;
      let entrada: gsap.core.Timeline | null = null;

      const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Esconde os elementos animados de imediato, ainda no callback síncrono —
      // assim não há um quadro com o título exposto antes de `fonts.ready`. Quem
      // pediu menos movimento nunca esconde nada: vê tudo, sem animação.
      const aEsconder = gsap.utils.toArray<HTMLElement>(
        "[data-titulo], [data-sobe], [data-risco]",
        secao,
      );
      if (!semMovimento) gsap.set(aEsconder, { autoAlpha: 0 });

      /* ── Entrada: só depois que o leader sai ──────────────────── */
      const abrirCena = () => {
        // Reduced motion: nada foi escondido, então não há o que revelar.
        if (semMovimento) return;

        // O SplitText precisa da fonte já carregada, senão ele quebra as
        // linhas com a métrica da fonte de fallback e o reveal sai torto.
        document.fonts.ready.then(() => {
          if (cancelado) return;

          const h1 = secao.querySelector<HTMLElement>("[data-titulo]");
          if (!h1) return;

          // Fora do callback síncrono do useGSAP o escopo não vale mais:
          // seletor em texto resolveria no documento inteiro. Elementos na mão.
          const sobem = gsap.utils.toArray<HTMLElement>("[data-sobe]", secao);
          const risco = secao.querySelector<HTMLElement>("[data-risco]");

          split = SplitText.create(h1, { type: "lines", mask: "lines" });

          // Tudo entra com `fromTo`: o estado inicial já está no CSS
          // (`opacity-0`), então não existe um quadro com o texto exposto
          // antes da animação assumir.
          entrada = gsap.timeline();
          entrada
            .set(h1, { autoAlpha: 1 })
            .fromTo(
              split.lines,
              { yPercent: 115 },
              { yPercent: 0, duration: 1.05, ease: "cut", stagger: 0.075 },
              0,
            )
            .fromTo(
              sobem,
              { y: 18, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08 },
              0.4,
            )
            .fromTo(
              risco,
              { scaleX: 0, autoAlpha: 1 },
              { scaleX: 1, duration: 0.5, ease: "dolly" },
              0.55,
            );
        });
      };

      const desinscrever = aoLiberarPalco(abrirCena);

      /* ── Scroll: a câmera recua e o texto sobe ────────────────── */
      mm.add(MQ_MOTION, () => {
        const gatilho = {
          trigger: secao,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        } as const;

        const zoom = gsap.to("[data-zoom]", {
          scale: 1.14,
          ease: "none",
          scrollTrigger: gatilho,
        });

        const texto = gsap.to("[data-conteudo]", {
          yPercent: -22,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { ...gatilho, end: "70% top" },
        });

        return () => {
          zoom.scrollTrigger?.kill();
          texto.scrollTrigger?.kill();
          zoom.kill();
          texto.kill();
        };
      });

      /* ── Mouse: deriva de câmera na mão ───────────────────────── */
      mm.add(MQ_FINE, () => {
        const camada = secao.querySelector<HTMLElement>("[data-mouse]");
        if (!camada) return;

        const x = gsap.quickTo(camada, "x", { duration: 1.2, ease: "power3" });
        const y = gsap.quickTo(camada, "y", { duration: 1.2, ease: "power3" });

        const mover = (e: MouseEvent) => {
          // ±14px. Passou disso, vira enjoo.
          x((e.clientX / window.innerWidth - 0.5) * -28);
          y((e.clientY / window.innerHeight - 0.5) * -28);
        };

        window.addEventListener("mousemove", mover);
        return () => window.removeEventListener("mousemove", mover);
      });

      return () => {
        cancelado = true;
        desinscrever();
        entrada?.kill();
        split?.revert();
        mm.revert();
        ScrollTrigger.refresh();
      };
    },
    { scope: raiz },
  );

  return (
    <section
      ref={raiz}
      id="hero"
      aria-label="Início"
      className="relative h-[100svh] overflow-hidden bg-black"
    >
      {/* Foto sangrada. No desktop o container extrapola 12% para o parallax
          ter folga e nunca revelar borda vazia; no mobile o parallax não roda
          (sem ScrollSmoother), então a folga só desperdiçaria enquadramento. */}
      <div data-speed="0.88" className="absolute inset-0 md:inset-x-0 md:-inset-y-[12%]">
        <div data-mouse className="absolute inset-0">
          <div data-zoom className="absolute inset-0">
            <Image
              src={heroFoto.src}
              alt={heroFoto.alt}
              fill
              priority
              quality={85}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={heroFoto.blur}
              /* Foto vertical num quadro horizontal: sem `object-position`
                 o corte central come os rostos no desktop. 42% deixa o
                 casal no terço superior, onde o título não o cobre. */
              className="object-cover"
              style={{ objectPosition: "50% 42%" }}
            />
          </div>
        </div>
      </div>

      {/* Legibilidade. Preto sobre preto — não é cor, é exposição. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(5,5,5,0.94) 0%, rgba(5,5,5,0.78) 30%, rgba(5,5,5,0.42) 58%, rgba(5,5,5,0.12) 78%, rgba(5,5,5,0.5) 100%)",
        }}
      />

      {/* Conteúdo */}
      <div
        data-conteudo
        className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 md:px-14"
        style={{ paddingBottom: "calc(var(--letterbox-h, 24px) + 3.25rem)" }}
      >
        <p data-sobe className="mb-5 font-hud text-[10px] uppercase tracking-hud text-film-white/75">
          Cacoal · Desde 2024
        </p>

        <h1
          data-titulo
          /* "FOTOGRAFIA QUE RESPIRA." não tem acento — pode apertar. */
          className="font-display uppercase leading-[0.92] text-film-white md:leading-[0.88]"
          style={{ fontSize: "clamp(3.2rem, 13vw, 12rem)" }}
        >
          {TITULO.map((linha) => (
            <span key={linha} className="block">
              {linha}
            </span>
          ))}
        </h1>

        <div data-risco className="my-8 h-px w-16 origin-left bg-film-white/40" />

        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <p
            data-sobe
            className="max-w-sm font-body text-sm leading-relaxed text-film-400"
          >
            Casais, famílias, retratos e eventos — com a luz que cada momento pede.
          </p>

          <div data-sobe className="flex flex-wrap items-center gap-8">
            <a
              href="#contato"
              className="inline-flex items-center justify-center border border-film-white px-8 py-4 font-body text-[11px] font-semibold uppercase tracking-label text-film-white transition-colors duration-300 hover:bg-film-white hover:text-film-black"
            >
              Agendar ensaio
            </a>
            <a
              href="#portfolio"
              className="inline-flex min-h-[44px] items-center font-hud text-[11px] uppercase tracking-hud text-film-400 transition-colors duration-300 hover:text-film-white"
            >
              Ver portfólio
            </a>
          </div>
        </div>
      </div>

      {/* Marcação de rolo, alinhada ao letterbox */}
      <span
        aria-hidden
        className="absolute right-6 font-hud text-[9px] uppercase tracking-hud text-film-grey"
        style={{ bottom: "calc(var(--letterbox-h, 24px) + 1.1rem)" }}
      >
        01 — Role
      </span>
    </section>
  );
}
