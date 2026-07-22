"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const words = ["Pronto para", "seu ensaio?"];

export default function CTAFinal() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32 sm:py-44 px-6"
      style={{
        background: "linear-gradient(160deg, #0A0A0A 0%, #050505 35%, #050505 60%, #050505 100%)",
        borderTop: "1px solid rgba(237,237,232,0.1)",
      }}
    >
      {/* Aurora — large blue bloom, center */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: "radial-gradient(ellipse 70% 65% at 50% 35%, rgba(237,237,232,0.22) 0%, rgba(237,237,232,0.04) 55%, transparent 75%)",
          willChange: "transform, opacity",
          animation: "aurora-pulse 16s ease-in-out infinite",
        }}
      />

      {/* Aurora — cyan accent, off-right */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: "radial-gradient(ellipse 45% 50% at 85% 60%, rgba(237,237,232,0.09) 0%, transparent 65%)",
          willChange: "transform, opacity",
          animation: "aurora-drift 22s ease-in-out infinite 3s",
        }}
      />

      {/* Aurora — indigo, bottom-left */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: "radial-gradient(ellipse 40% 45% at 10% 85%, rgba(237,237,232,0.1) 0%, transparent 65%)",
          willChange: "transform, opacity",
          animation: "aurora-slow 19s ease-in-out infinite 6s",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage: "radial-gradient(circle, rgba(237,237,232,0.055) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Top glow hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        aria-hidden
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(237,237,232,0.5) 50%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="max-w-5xl mx-auto text-center relative z-10">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <div className="h-px w-6 bg-flash" />
          <span className="font-body text-flash text-[0.6rem] tracking-[0.5em] uppercase font-medium">
            Reserve seu ensaio
          </span>
          <div className="h-px w-6 bg-flash" />
        </motion.div>

        {/* Headline — word reveal */}
        <div className="overflow-hidden mb-10">
          {words.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="block font-display font-bold text-white leading-[1.02]"
                  style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
                >
                  {line}
                </span>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="font-body text-silver/45 text-sm sm:text-base max-w-md mx-auto mb-14 leading-relaxed"
        >
          As agendas enchem rápido. Reserve agora e garanta o ensaio
          que você sempre sonhou — com cuidado, arte e uma experiência
          inesquecível do início ao fim.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contato"
            className="inline-flex items-center gap-3 bg-white text-ink text-[0.7rem] tracking-[0.25em] uppercase font-body font-semibold px-10 py-4 hover:bg-nebula-400 hover:text-white transition-all duration-200"
          >
            Agendar meu ensaio <ArrowRight size={12} />
          </a>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border text-silver text-[0.7rem] tracking-[0.25em] uppercase font-body font-semibold px-10 py-4 transition-all duration-200"
            style={{ borderColor: "rgba(237,237,232,0.25)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(237,237,232,0.6)";
              e.currentTarget.style.color = "#9C9C97";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(237,237,232,0.25)";
              e.currentTarget.style.color = "#9A9A9A";
            }}
          >
            WhatsApp →
          </a>
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="font-body text-silver/20 text-[0.6rem] tracking-[0.5em] uppercase mt-16"
        >
          ZP Studio · São Paulo · fotografia@zpstudio.com.br
        </motion.p>
      </div>
    </section>
  );
}
