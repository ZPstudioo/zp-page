"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import InfiniteGallery from "@/components/ui/3d-gallery-photography";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80&fit=crop", alt: "Ensaio de casal ao entardecer" },
  { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80&fit=crop", alt: "Retrato feminino" },
  { src: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&q=80&fit=crop", alt: "Ensaio gestante" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80&fit=crop", alt: "Fotografia de casamento" },
  { src: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&q=80&fit=crop", alt: "Casal na natureza" },
  { src: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=800&q=80&fit=crop", alt: "Retrato artístico" },
  { src: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80&fit=crop", alt: "Gestante em jardim" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&fit=crop", alt: "Evento especial" },
  { src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80&fit=crop", alt: "Casal urbano" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80&fit=crop", alt: "Retrato de noiva" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80&fit=crop", alt: "Casamento ao ar livre" },
  { src: "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=800&q=80&fit=crop", alt: "Ensaio família" },
];

export default function ImmersiveGallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="galeria-imersiva"
      className="relative z-10 h-screen w-full overflow-hidden"
      aria-label="Galeria imersiva 3D"
    >
      <InfiniteGallery
        images={galleryImages}
        speed={1.2}
        visibleCount={12}
        className="absolute inset-0 h-full w-full"
        fadeSettings={{
          fadeIn: { start: 0.05, end: 0.25 },
          fadeOut: { start: 0.4, end: 0.43 },
        }}
        blurSettings={{
          blurIn: { start: 0.0, end: 0.1 },
          blurOut: { start: 0.4, end: 0.43 },
          maxBlur: 8.0,
        }}
      />

      {/* Dark vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(8,17,31,0.80) 100%)",
        }}
      />

      {/* Blue color tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(37,99,235,0.06) 0%, transparent 40%, rgba(8,17,31,0.1) 100%)",
        }}
      />

      {/* Hint */}
      <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
        <p className="font-body text-[0.6rem] tracking-[0.3em] uppercase text-white/20">
          Use as setas do teclado para navegar · autoplay contínuo
        </p>
      </div>

      {/* Bottom rule */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.3), rgba(34,211,238,0.15), transparent)" }}
      />
    </section>
  );
}
