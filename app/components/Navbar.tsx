"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Sobre",       href: "#sobre" },
  { label: "Serviços",    href: "#servicos" },
  { label: "Portfólio",   href: "#portfolio" },
  { label: "Processo",    href: "#processo" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato",     href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(6, 12, 22, 0.88)"
          : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px) saturate(1.4)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(59,130,246,0.1)"
          : "none",
        paddingTop: scrolled ? "0.75rem" : "1.25rem",
        paddingBottom: scrolled ? "0.75rem" : "1.25rem",
      }}
    >
      {/* Subtle blue top glow when scrolled */}
      {scrolled && (
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.35) 50%, transparent 100%)",
          }}
        />
      )}

      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-display text-lg font-bold tracking-[0.2em] text-white">
            ZP
          </span>
          <span className="font-display text-lg font-bold text-flash">.</span>
          <span className="font-body text-silver/60 text-[0.55rem] tracking-[0.45em] uppercase hidden sm:block mt-px">
            Studio
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-silver/60 hover:text-white text-[0.65rem] tracking-[0.2em] uppercase font-body font-medium transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-nebula-400 group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contato"
          className="hidden md:inline-flex items-center px-6 py-2 border text-[0.65rem] font-body font-semibold tracking-[0.25em] uppercase text-white transition-all duration-200"
          style={{
            borderColor: "rgba(59,130,246,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(96,165,250,0.8)";
            e.currentTarget.style.color = "#60A5FA";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)";
            e.currentTarget.style.color = "#FFFFFF";
          }}
        >
          Agendar
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-1.5"
          aria-label="Abrir menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
            style={{
              background: "rgba(6,12,22,0.97)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(59,130,246,0.08)",
            }}
          >
            <ul className="px-6 py-8 flex flex-col gap-6">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-silver/70 hover:text-white text-sm font-body font-medium tracking-wide transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-4" style={{ borderTop: "1px solid rgba(59,130,246,0.08)" }}>
                <a
                  href="#contato"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center px-6 py-3 border text-nebula-400 text-[0.7rem] font-body font-semibold tracking-widest uppercase"
                  style={{ borderColor: "rgba(59,130,246,0.35)" }}
                >
                  Agendar Ensaio
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
