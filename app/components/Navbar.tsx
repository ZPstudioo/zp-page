"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { aoLiberarPalco } from "./film/leader-bus";

/**
 * Navegação.
 *
 * Sem vidro fosco, sem blur, sem barra flutuante arredondada. Uma linha
 * de créditos: nome à esquerda, seções em mono, e um traço que se desenha
 * sob o link no hover — como quem risca uma decupagem.
 *
 * Encostada na barra do letterbox (`--letterbox-h`), acompanha a retração.
 */

const links = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Processo", href: "#processo" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const raiz = useRef<HTMLElement>(null);
  const [aberto, setAberto] = useState(false);

  useGSAP(
    () => {
      const desinscrever = aoLiberarPalco(() => {
        gsap.from(raiz.current, { yPercent: -120, autoAlpha: 0, duration: 0.8, ease: "cut" });
      });

      // Depois da primeira tela a barra ganha fundo sólido — sólido, não turvo.
      const fundo = gsap.to("[data-fundo]", {
        autoAlpha: 1,
        duration: 0.3,
        paused: true,
      });

      // `end` explícito: sem ele, o range fica ambíguo e o fundo sólido pode
      // "desligar" antes do fim da página — foi o que deixava o CTA final
      // (única seção branca) com texto branco sobre fundo branco.
      const st = ScrollTrigger.create({
        start: "top -80",
        end: "max",
        onToggle: (self) => (self.isActive ? fundo.play() : fundo.reverse()),
      });

      return () => {
        desinscrever();
        st.kill();
        fundo.kill();
      };
    },
    { scope: raiz },
  );

  // O menu de celular anima na abertura; o `dependencies` refaz na troca.
  // Sem `scope`: o conteúdo é portado para `document.body` (ver JSX abaixo),
  // fora da subárvore do `header` — um `scope: raiz` não encontraria nada.
  useGSAP(
    () => {
      if (!aberto) return;
      gsap.from("[data-menu-item]", {
        yPercent: 110,
        autoAlpha: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: "cut",
      });
    },
    { dependencies: [aberto] },
  );

  return (
    <header
      ref={raiz}
      className="fixed inset-x-0 z-[55]"
      style={{ top: "var(--letterbox-h, 24px)" }}
    >
      <div
        data-fundo
        aria-hidden
        className="absolute inset-0 bg-film-black opacity-0"
        style={{ borderBottom: "1px solid var(--film-line)" }}
      />

      {/* Menu de celular via portal para document.body.
          Não pode ser filho do <header>: a entrada dele é animada por GSAP
          (`gsap.from(raiz.current, { yPercent: ... })`), e isso deixa um
          `transform` (mesmo em repouso) no elemento — qualquer `transform`
          num ancestral vira containing block para descendentes `fixed`. O
          menu (`inset-0`, pensado pra cobrir o viewport) passava a se
          referenciar ao header de ~64px em vez da tela inteira, e colapsava
          nele — os itens ficavam espremidos e o <nav> tampava os cliques. */}
      {aberto &&
        createPortal(
          <div
            id="menu-mobile"
            className="fixed inset-0 z-[90] flex flex-col justify-center gap-1 bg-film-black px-6 md:hidden"
          >
            {links.map((link) => (
              <span key={link.href} className="mask-line">
                <a
                  data-menu-item
                  href={link.href}
                  onClick={() => setAberto(false)}
                  className="block py-1 font-display text-4xl uppercase text-film-white"
                >
                  {link.label}
                </a>
              </span>
            ))}
            <span className="mask-line mt-8">
              <a
                data-menu-item
                href="#contato"
                onClick={() => setAberto(false)}
                className="inline-block border border-film-white px-7 py-3.5 font-hud text-[10px] uppercase tracking-hud text-film-white"
              >
                Agendar ensaio
              </a>
            </span>
          </div>,
          document.body,
        )}

      <nav className="relative flex items-center justify-between px-6 py-4 md:px-14">
        <a href="#hero" className="flex min-h-[44px] items-center gap-2.5" aria-label="ZP Studio, início">
          <Image src="/logo/zp-marca.png" alt="ZP Studio" width={592} height={350} priority className="h-6 w-auto md:h-7" />
          <span className="hidden font-hud text-[9px] uppercase tracking-hud text-film-grey sm:block">
            35mm
          </span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative font-hud text-[10px] uppercase tracking-hud text-film-400 transition-colors duration-300 hover:text-film-white"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-film-white transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contato"
          className="hidden border border-film-white/25 px-6 py-2.5 font-hud text-[10px] uppercase tracking-hud text-film-white transition-colors duration-300 hover:bg-film-white hover:text-film-black md:inline-flex"
        >
          Agendar
        </a>

        <button
          onClick={() => setAberto((v) => !v)}
          className="-mr-2 flex h-11 w-11 flex-col items-end justify-center gap-1.5 pr-2 md:hidden"
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
        >
          <span
            className="h-px bg-film-white transition-all duration-300"
            style={{ width: aberto ? 20 : 22, transform: aberto ? "translateY(3px) rotate(45deg)" : "none" }}
          />
          <span
            className="h-px bg-film-white transition-all duration-300"
            style={{ width: aberto ? 20 : 14, transform: aberto ? "translateY(-3px) rotate(-45deg)" : "none" }}
          />
        </button>
      </nav>

    </header>
  );
}
