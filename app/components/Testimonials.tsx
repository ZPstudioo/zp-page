"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Ana Carolina Silva",
    role: "Ensaio de Casal",
    text: "As fotos ficaram incríveis. O ZP Studio tem um jeito único de capturar emoção — cada imagem parece um quadro. Já indiquei para todos os meus amigos.",
  },
  {
    id: 2,
    name: "Mariana Costa",
    role: "Ensaio Gestante",
    text: "Estava nervosa antes do ensaio, mas o fotógrafo me deixou completamente à vontade. O resultado foi além do que eu sonhei. Uma memória para a vida inteira.",
  },
  {
    id: 3,
    name: "Rafael & Júlia Santos",
    role: "Fotografia de Casamento",
    text: "O ZP Studio capturou nosso casamento de um jeito que nos fez chorar de emoção ao ver as fotos. Profissionalismo e sensibilidade que raramente se encontra.",
  },
  {
    id: 4,
    name: "Beatriz Mendonça",
    role: "Retrato Profissional",
    text: "Precisava de fotos para o LinkedIn e saí com muito mais: uma série de imagens que realmente me representa. Atenção aos detalhes impecável.",
  },
];

export default function Testimonials() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="depoimentos"
      ref={ref}
      className="relative py-32 px-6"
      style={{ borderTop: "1px solid rgba(59,130,246,0.08)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="font-body text-nebula-400 text-[0.62rem] tracking-[0.5em] uppercase font-medium mb-4">
              Depoimentos
            </p>
            <h2
              className="font-display font-bold text-white leading-[1.08]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              O que dizem<br />
              <span className="font-editorial italic font-normal text-silver/60" style={{ fontSize: "0.88em" }}>
                nossos clientes.
              </span>
            </h2>
          </div>
          <p className="font-body text-silver/40 text-sm max-w-xs leading-relaxed hidden md:block">
            Histórias reais de quem confiou a nós os momentos mais importantes da vida.
          </p>
        </motion.div>

        {/* Editorial 2×2 grid */}
        <div
          className="grid md:grid-cols-2"
          style={{ borderTop: "1px solid rgba(59,130,246,0.08)" }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="p-10 lg:p-12 flex flex-col justify-between gap-8 group hover:bg-nebula-500/[0.03] transition-colors duration-300"
              style={{
                borderBottom: "1px solid rgba(59,130,246,0.08)",
                borderRight: i % 2 === 0 ? "1px solid rgba(59,130,246,0.08)" : undefined,
              }}
            >
              {/* Quote text */}
              <p
                className="font-editorial italic text-white/75 leading-[1.7] group-hover:text-white/90 transition-colors duration-300"
                style={{ fontSize: "clamp(1rem, 1.6vw, 1.2rem)" }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-5 h-px bg-flash shrink-0" />
                <div>
                  <p className="font-display font-semibold text-white text-sm">{t.name}</p>
                  <p className="font-body text-silver/40 text-[0.6rem] tracking-[0.35em] uppercase mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
