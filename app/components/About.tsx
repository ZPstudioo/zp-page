"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function CountUp({ target, suffix = "", active }: { target: number; suffix?: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const total = 50;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / total;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (frame >= total) { setCount(target); clearInterval(timer); }
    }, 20);
    return () => clearInterval(timer);
  }, [active, target]);

  return <>{count}{suffix}</>;
}

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="sobre"
      ref={ref}
      className="relative py-32 px-6"
      style={{ borderTop: "1px solid rgba(237,237,232,0.08)" }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Image with clip-path reveal */}
        <div className="relative">
          <motion.div
            className="relative aspect-[4/5] overflow-hidden"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=90"
              alt="Fotógrafo ZP Studio em sessão"
              className="w-full h-full object-cover"
            />
            {/* Blue overlay — subtle galaxy tint */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(180deg, rgba(237,237,232,0.08) 0%, transparent 50%, rgba(6,14,27,0.4) 100%)" }}
            />
          </motion.div>

          {/* Corner accent — blue instead of flash */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="absolute -bottom-3 -right-3 w-10 h-10"
            style={{
              borderRight: "2px solid rgba(237,237,232,0.5)",
              borderBottom: "2px solid rgba(237,237,232,0.5)",
            }}
          />
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-7"
        >
          <p className="font-body text-nebula-400 text-[0.62rem] tracking-[0.5em] uppercase font-medium">
            Sobre o Estúdio
          </p>

          <h2
            className="font-display font-bold text-white leading-[1.08]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            Arte com alma,<br />
            <span className="font-editorial italic font-normal text-silver/70" style={{ fontSize: "0.88em" }}>
              luz com intenção.
            </span>
          </h2>

          <p className="font-body text-silver/65 text-sm leading-[1.9]">
            O ZP Studio nasceu da crença de que toda fotografia carrega um universo
            dentro dela. Não apenas uma imagem — um sentimento congelado no tempo,
            pronto para ser revisitado para sempre.
          </p>
          <p className="font-body text-silver/50 text-sm leading-[1.9]">
            Com anos de experiência e um olhar treinado para capturar o extraordinário
            no ordinário, cada sessão é conduzida com cuidado, direção artística e
            uma conexão genuína com quem está na frente da câmera.
          </p>

          {/* Stats row */}
          <div
            className="pt-7 grid grid-cols-3 gap-6"
            style={{ borderTop: "1px solid rgba(237,237,232,0.08)" }}
          >
            {[
              { target: 500, suffix: "+", label: "Ensaios" },
              { target: 8,   suffix: "",  label: "Anos" },
              { target: 100, suffix: "%", label: "Satisfação" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-display font-bold text-white mb-1"
                  style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)" }}
                >
                  <CountUp target={stat.target} suffix={stat.suffix} active={inView} />
                </p>
                <p className="font-body text-nebula-400/50 text-[0.6rem] tracking-[0.4em] uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
