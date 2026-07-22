"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Mail, Instagram, ArrowRight } from "lucide-react";

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const links = [
    {
      href:  "https://wa.me/5511999999999",
      label: "WhatsApp",
      sub:   "(11) 99999-9999",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
    },
    {
      href:  "mailto:contato@zpstudio.com.br",
      label: "E-mail",
      sub:   "contato@zpstudio.com.br",
      icon:  <Mail size={14} aria-hidden />,
    },
    {
      href:  "https://instagram.com/zp.studio_oficial",
      label: "Instagram",
      sub:   "@zp.studio_oficial",
      icon:  <Instagram size={14} aria-hidden />,
    },
  ];

  return (
    <section id="contato" ref={ref} className="relative py-32 px-6" style={{ borderTop: "1px solid rgba(59,130,246,0.08)" }}>
      <div className="max-w-2xl mx-auto flex flex-col gap-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-body text-nebula-400 text-[0.62rem] tracking-[0.5em] uppercase font-medium mb-4">
            Contato
          </p>
          <h2
            className="font-display font-bold text-white leading-[1.08] mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            Vamos criar algo<br />
            <span className="font-editorial italic font-normal text-silver/60" style={{ fontSize: "0.9em" }}>
              extraordinário juntos.
            </span>
          </h2>
          <p className="font-body text-silver/45 text-sm leading-relaxed">
            Respondemos em até 24 horas.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col gap-2"
        >
          {links.map(({ href, label, sub, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 py-4 transition-colors duration-200"
              style={{ borderBottom: "1px solid rgba(59,130,246,0.08)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderBottomColor = "rgba(96,165,250,0.25)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderBottomColor = "rgba(59,130,246,0.08)"; }}
            >
              <span className="text-silver/30 group-hover:text-nebula-400 transition-colors duration-200">
                {icon}
              </span>
              <div>
                <p className="font-body font-medium text-white text-sm">{label}</p>
                <p className="font-body text-silver/40 text-xs mt-0.5">{sub}</p>
              </div>
              <ArrowRight size={12} className="ml-auto text-silver/15 group-hover:text-nebula-400 transition-colors duration-200" />
            </a>
          ))}

          <div className="flex items-center gap-5 py-4">
            <MapPin size={14} className="text-silver/30" aria-hidden />
            <div>
              <p className="font-body font-medium text-white text-sm">Localização</p>
              <p className="font-body text-silver/40 text-xs mt-0.5">São Paulo, SP — Brasil</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
