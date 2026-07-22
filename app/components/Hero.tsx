"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const words = ["Fotografia", "que", "respira."];

const reveal = {
  hidden: { opacity: 0, y: 56, skewY: 4 },
  show:   (i: number) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      delay: 0.3 + i * 0.14,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ background: "linear-gradient(160deg, #060E1B 0%, #08111F 40%, #0A1428 70%, #060F1C 100%)" }}
      aria-label="Seção inicial"
    >
      {/* ═══════════════════════════════════════════════════
          AURORA LAYERS — GPU only (transform + opacity)
          Radial gradients: painted once, composited always
      ═══════════════════════════════════════════════════ */}

      {/* Aurora 1 — deep blue, top-right dominant */}
      <div
        className="absolute pointer-events-none select-none"
        aria-hidden
        style={{
          inset: 0,
          background: "radial-gradient(ellipse 70% 65% at 78% 20%, rgba(29,78,216,0.28) 0%, rgba(37,99,235,0.06) 55%, transparent 75%)",
          willChange: "transform, opacity",
          animation: "aurora-pulse 14s ease-in-out infinite",
        }}
      />

      {/* Aurora 2 — cyan accent, mid-right */}
      <div
        className="absolute pointer-events-none select-none"
        aria-hidden
        style={{
          inset: 0,
          background: "radial-gradient(ellipse 45% 50% at 85% 55%, rgba(34,211,238,0.1) 0%, rgba(6,182,212,0.02) 50%, transparent 70%)",
          willChange: "transform, opacity",
          animation: "aurora-drift 20s ease-in-out infinite",
        }}
      />

      {/* Aurora 3 — indigo, bottom-left */}
      <div
        className="absolute pointer-events-none select-none"
        aria-hidden
        style={{
          inset: 0,
          background: "radial-gradient(ellipse 50% 55% at 12% 80%, rgba(79,70,229,0.12) 0%, transparent 65%)",
          willChange: "transform, opacity",
          animation: "aurora-slow 18s ease-in-out infinite 5s",
        }}
      />

      {/* Aurora 4 — very subtle blue center pulse */}
      <div
        className="absolute pointer-events-none select-none"
        aria-hidden
        style={{
          inset: 0,
          background: "radial-gradient(ellipse 55% 40% at 48% 45%, rgba(37,99,235,0.07) 0%, transparent 65%)",
          willChange: "transform, opacity",
          animation: "aurora-slow 22s ease-in-out infinite 2s reverse",
        }}
      />

      {/* Dot grid — blue-tinted, fades at edges */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden
        style={{
          backgroundImage: "radial-gradient(circle, rgba(96,165,250,0.07) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)," +
            "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)," +
            "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Vignette — darkens corners */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 55%, rgba(4,8,16,0.75) 100%)",
        }}
      />

      {/* ═══════════════════════════════════════════════════
          CONTENT
      ═══════════════════════════════════════════════════ */}
      <div className="flex-1 grid md:grid-cols-[1fr_340px] lg:grid-cols-[1fr_420px]">

        {/* LEFT — text */}
        <div className="relative flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24 pt-28 pb-20 md:pb-32">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-body text-nebula-400/60 text-[0.6rem] tracking-[0.5em] uppercase mb-10"
          >
            São Paulo · Studio Fotográfico · Est. 2016
          </motion.p>

          {/* Headline */}
          <h1
            className="font-display font-bold text-white leading-[1.02] tracking-tight mb-8"
            style={{ fontSize: "clamp(4rem, 11vw, 10rem)" }}
          >
            {words.map((word, i) => (
              <span key={word} className="block overflow-hidden" aria-label={word}>
                <motion.span
                  className="block"
                  variants={reveal}
                  initial="hidden"
                  animate="show"
                  custom={i}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Flash divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.85, duration: 0.45, ease: "easeOut" }}
            className="origin-left h-px w-10 bg-flash mb-8"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6 }}
            className="font-body text-silver text-sm sm:text-base leading-[1.8] max-w-sm mb-12"
          >
            Retratos, casais, gestante e eventos —<br />
            com a luz que cada momento merece.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex flex-wrap items-center gap-6"
          >
            <a
              href="#contato"
              className="inline-flex items-center gap-3 border border-white text-white text-[0.7rem] tracking-[0.25em] uppercase font-body font-semibold px-8 py-4 hover:bg-white hover:text-ink transition-all duration-200"
            >
              Agendar Ensaio <ArrowRight size={12} />
            </a>
            <a
              href="#portfolio"
              className="text-silver/70 hover:text-white text-[0.7rem] tracking-[0.25em] uppercase font-body font-medium transition-colors duration-200 group"
            >
              Ver Portfólio{" "}
              <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">→</span>
            </a>
          </motion.div>
        </div>

        {/* RIGHT — photo panel (desktop only) */}
        <div className="hidden md:block relative overflow-hidden">
          <motion.img
            src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=700&q=85&fit=crop"
            alt="Ensaio fotográfico ZP Studio"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Left fade into dark bg */}
          <div
            className="absolute inset-y-0 left-0 w-28 pointer-events-none"
            style={{ background: "linear-gradient(to right, #08111F, transparent)" }}
          />
          {/* Bottom vignette */}
          <div
            className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(6,14,27,0.85), transparent)" }}
          />
          {/* Top vignette */}
          <div
            className="absolute inset-x-0 top-0 h-24 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(6,14,27,0.6), transparent)" }}
          />
          {/* Subtle blue overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 60% at 60% 30%, rgba(29,78,216,0.12) 0%, transparent 70%)" }}
          />
        </div>
      </div>

      {/* ── Stats strip ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        style={{ borderTop: "1px solid rgba(59,130,246,0.1)" }}
      >
        <div className="max-w-7xl mx-auto px-8 sm:px-12 md:px-16 lg:px-24 py-5 flex items-center gap-10 md:gap-16">
          {[
            { value: "500+",   label: "ensaios realizados" },
            { value: "8 anos", label: "de experiência" },
            { value: "100%",   label: "satisfação garantida" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <span className="font-display font-bold text-white" style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}>
                {stat.value}
              </span>
              <span className="font-body text-silver/35 text-[0.6rem] tracking-wider uppercase hidden sm:block">
                {stat.label}
              </span>
            </div>
          ))}

          <div className="ml-auto items-center gap-2 text-silver/20 hidden lg:flex">
            <span className="font-body text-[0.55rem] tracking-[0.4em] uppercase">Scroll</span>
            <div className="w-px h-3.5 bg-silver/15" />
            <span className="text-[0.6rem]">↓</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
