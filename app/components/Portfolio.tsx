"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import InfiniteGallery from "@/components/ui/3d-gallery-photography";

const categories = ["Todos", "Casais", "Retratos", "Gestante", "Eventos"] as const;
type Category = (typeof categories)[number];

const photosByCategory: Record<Exclude<Category, "Todos">, { src: string; alt: string }[]> = {
  Casais: [
    { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=900&q=85&fit=crop", alt: "Amor ao entardecer" },
    { src: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=900&q=85&fit=crop", alt: "Casal na natureza" },
    { src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=900&q=85&fit=crop", alt: "Casal urbano" },
    { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&q=85&fit=crop", alt: "Noivos" },
    { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=85&fit=crop", alt: "Casamento ao ar livre" },
  ],
  Retratos: [
    { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=85&fit=crop", alt: "Retrato feminino" },
    { src: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=900&q=85&fit=crop", alt: "Retrato artístico" },
    { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&q=85&fit=crop", alt: "Retrato editorial" },
    { src: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=900&q=85&fit=crop", alt: "Retrato masculino" },
    { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=85&fit=crop", alt: "Retrato natural" },
  ],
  Gestante: [
    { src: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=900&q=85&fit=crop", alt: "Gestante suave" },
    { src: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=900&q=85&fit=crop", alt: "Gestante em jardim" },
    { src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=900&q=85&fit=crop", alt: "Maternidade" },
    { src: "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=900&q=85&fit=crop", alt: "Família esperando" },
  ],
  Eventos: [
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=85&fit=crop", alt: "Casamento" },
    { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85&fit=crop", alt: "Evento especial" },
    { src: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=900&q=85&fit=crop", alt: "Formatura" },
    { src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=900&q=85&fit=crop", alt: "Celebração" },
  ],
};

const allPhotos = [
  ...photosByCategory.Casais,
  ...photosByCategory.Retratos,
  ...photosByCategory.Gestante,
  ...photosByCategory.Eventos,
];

const categoryLabels: Record<Category, string> = {
  Todos: "Todos os ensaios",
  Casais: "Casais",
  Retratos: "Retratos",
  Gestante: "Gestante",
  Eventos: "Eventos",
};

function getImages(cat: Category) {
  return cat === "Todos" ? allPhotos : photosByCategory[cat];
}

export default function Portfolio() {
  const [active, setActive] = useState<Category>("Todos");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const images = getImages(active);

  return (
    <section id="portfolio" ref={ref} className="relative" style={{ borderTop: "1px solid rgba(59,130,246,0.08)" }}>

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <p className="font-body text-nebula-400 text-[0.62rem] tracking-[0.5em] uppercase font-medium mb-4">
              Galeria
            </p>
            <h2
              className="font-display font-bold text-white leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Universos revelados
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="font-body text-[0.62rem] font-semibold tracking-[0.2em] uppercase transition-all duration-200 px-4 py-2"
                style={{
                  color:       active === cat ? "#FF3D00" : "rgba(255,255,255,0.3)",
                  borderBottom: active === cat ? "1px solid #FF3D00" : "1px solid transparent",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── 3D Gallery ────────────────────────────────────────────── */}
      <div className="relative w-full" style={{ height: "80vh" }}>

        {/* Single canvas — images prop drives content, no remount */}
        <InfiniteGallery
          images={images}
          speed={1.0}
          visibleCount={8}
          className="w-full h-full"
          fadeSettings={{
            fadeIn: { start: 0.05, end: 0.22 },
            fadeOut: { start: 0.42, end: 0.46 },
          }}
          blurSettings={{
            blurIn: { start: 0.0, end: 0.1 },
            blurOut: { start: 0.42, end: 0.46 },
            maxBlur: 6.0,
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(11,11,11,0.88) 100%)",
          }}
        />

        {/* Category label */}
        <div className="absolute inset-0 pointer-events-none flex items-end justify-center pb-10 mix-blend-exclusion">
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="font-display font-bold text-white/80 text-center leading-none"
              style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
            >
              {categoryLabels[active]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Keyboard hint */}
        <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
          <p className="font-body text-[0.58rem] tracking-[0.3em] uppercase text-frost/20">
            ← → setas do teclado para navegar
          </p>
        </div>
      </div>

      <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
    </section>
  );
}
