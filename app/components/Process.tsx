"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    title: "Briefing",
    description:
      "Conversamos sobre você, seus desejos e o clima do ensaio. Cada detalhe pensado antes do dia.",
  },
  {
    title: "Ensaio",
    description:
      "Um dia de imersão criativa. Direção de poses, luz e emoção — você relaxa, a magia acontece.",
  },
  {
    title: "Edição",
    description:
      "Cada foto tratada individualmente com cor, contraste e retoques que preservam a essência natural.",
  },
  {
    title: "Entrega",
    description:
      "Galeria online privada com todas as imagens em alta resolução, prontas para guardar para sempre.",
  },
];

export default function Process() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="processo"
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
          className="mb-20 max-w-lg"
        >
          <p className="font-body text-nebula-400 text-[0.62rem] tracking-[0.5em] uppercase font-medium mb-4">
            Como funciona
          </p>
          <h2
            className="font-display font-bold text-white leading-[1.08]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Do primeiro contato<br />
            <span className="font-editorial italic font-normal text-silver/60" style={{ fontSize: "0.88em" }}>
              às memórias eternas.
            </span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0"
          style={{ borderTop: "1px solid rgba(59,130,246,0.08)" }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group p-8 transition-colors duration-200 hover:bg-nebula-500/[0.04]"
              style={{
                borderRight: i < steps.length - 1 ? "1px solid rgba(59,130,246,0.08)" : undefined,
              }}
            >
              {/* Number */}
              <p className="font-display text-[0.6rem] tracking-[0.4em] text-nebula-400/70 mb-6">
                0{i + 1}
              </p>

              <h3 className="font-display font-semibold text-white text-base mb-3 group-hover:text-nebula-400 transition-colors duration-200">
                {step.title}
              </h3>
              <p className="font-body text-silver/45 text-sm leading-[1.75]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
