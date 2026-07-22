"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    title: "Ensaio de Casal",
    description: "Histórias de amor capturadas com poesia. Luz natural ou estúdio.",
    price: "A partir de R$ 600",
    img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=500&q=80&fit=crop",
  },
  {
    title: "Retrato Individual",
    description: "Sua essência traduzida em imagem. Artístico ou profissional.",
    price: "A partir de R$ 400",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80&fit=crop",
  },
  {
    title: "Gestante & Newborn",
    description: "A magia da vida que chega — registros delicados de um momento único.",
    price: "A partir de R$ 700",
    img: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=500&q=80&fit=crop",
  },
  {
    title: "Família",
    description: "Laços eternos em uma única imagem. Sessões descontraídas e autênticas.",
    price: "A partir de R$ 800",
    img: "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=500&q=80&fit=crop",
  },
  {
    title: "Eventos",
    description: "Cobertura completa de casamentos, aniversários e formaturas.",
    price: "Consulte valores",
    img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&q=80&fit=crop",
  },
  {
    title: "Corporativo",
    description: "Headshots e fotos institucionais que transmitem credibilidade.",
    price: "A partir de R$ 500",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80&fit=crop",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const floatRef   = useRef<HTMLDivElement>(null);
  const ref        = useRef(null);
  const inView     = useInView(ref, { once: true, margin: "-80px" });

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // ── Performance-critical: update position via direct DOM mutation,
  //    never via setState — eliminates re-renders on every mouse move.
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!floatRef.current || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + 28;
    const y = e.clientY - rect.top - 130;
    floatRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  return (
    <section
      id="servicos"
      ref={ref}
      className="relative py-32 px-6"
      style={{ borderTop: "1px solid rgba(237,237,232,0.08)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="font-body text-nebula-400 text-[0.62rem] tracking-[0.5em] uppercase font-medium mb-3">
              O que fazemos
            </p>
            <h2
              className="font-display font-bold text-white leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Serviços &<br />Experiências
            </h2>
          </div>
          <p className="font-body text-silver/50 text-sm max-w-xs leading-relaxed">
            Cada modalidade pensada para entregar o máximo de cuidado, arte e emoção.
          </p>
        </motion.div>

        {/* Interactive rows */}
        <div
          ref={sectionRef}
          onMouseMove={handleMouseMove}
          className="relative"
          style={{ borderTop: "1px solid rgba(237,237,232,0.08)" }}
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group flex items-center gap-6 py-6 md:py-7 transition-colors duration-150 cursor-default"
              style={{ borderBottom: "1px solid rgba(237,237,232,0.07)" }}
            >
              <span
                className="font-display text-[0.6rem] tracking-[0.3em] shrink-0 transition-colors duration-200 w-8"
                style={{ color: hoveredIndex === i ? "#FF3D00" : "rgba(255,255,255,0.15)" }}
              >
                0{i + 1}
              </span>

              <h3
                className="font-display font-semibold text-white transition-colors duration-200 flex-1 min-w-0"
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                  color: hoveredIndex === i ? "#FFFFFF" : "rgba(255,255,255,0.75)",
                }}
              >
                {service.title}
              </h3>

              <p className="font-body text-silver/40 text-xs leading-relaxed max-w-xs hidden lg:block">
                {service.description}
              </p>

              <span
                className="font-body text-[0.65rem] tracking-wide shrink-0 hidden sm:block transition-colors duration-200"
                style={{ color: hoveredIndex === i ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)" }}
              >
                {service.price}
              </span>

              <ArrowUpRight
                size={14}
                className="shrink-0 transition-all duration-200"
                style={{
                  color: hoveredIndex === i ? "#FF3D00" : "rgba(255,255,255,0.1)",
                  transform: hoveredIndex === i ? "translate(2px,-2px)" : "translate(0,0)",
                }}
              />
            </motion.div>
          ))}

          {/* ── Floating image — two-div pattern:
               Outer: opacity + scale driven by state (re-render OK, rare)
               Inner: translate driven by ref (direct DOM, zero re-renders) */}
          <div
            aria-hidden
            className="absolute top-0 left-0 pointer-events-none z-20"
            style={{
              opacity:    hoveredIndex !== null ? 1 : 0,
              transform:  hoveredIndex !== null ? "scale(1)" : "scale(0.88)",
              transition: "opacity 0.18s ease, transform 0.18s ease",
            }}
          >
            <div
              ref={floatRef}
              style={{ width: 200, height: 260, willChange: "transform" }}
              className="relative overflow-hidden"
            >
              {services.map((service, i) => (
                // All images always in DOM — CSS opacity swaps active one
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={service.title}
                  src={service.img}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    opacity:    hoveredIndex === i ? 1 : 0,
                    transition: "opacity 0.12s ease",
                  }}
                />
              ))}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-flash" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
