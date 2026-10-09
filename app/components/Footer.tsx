import Image from "next/image";
import { Instagram, Mail } from "lucide-react";
import CartelaFinal from "./CartelaFinal";

/**
 * Créditos finais. O site fecha como um filme fecha: nome grande, blocos
 * de crédito em colunas, e a linha de copyright por último.
 */

const navegar = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Galeria", href: "#portfolio" },
  { label: "Processo", href: "#processo" },
  { label: "Contato", href: "#contato" },
];

export default function Footer() {
  return (
    <footer className="bg-film-black" style={{ borderTop: "1px solid var(--film-line)" }}>
      {/* Nome enorme, como cartela final */}
      <div className="overflow-hidden px-6 pt-20 md:px-14">
        <CartelaFinal />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-14 md:px-14">
        <div className="grid gap-10 py-12 sm:grid-cols-2 md:grid-cols-4" style={{ borderTop: "1px solid var(--film-line)" }}>
          {/* Direção */}
          <div className="pt-8">
            <Image src="/logo/zp-marca.png" alt="" aria-hidden width={592} height={350} className="mb-6 h-8 w-auto" />
            <p className="mb-4 font-hud text-[9px] uppercase tracking-hud text-film-grey">Direção</p>
            <p className="max-w-xs font-body text-sm leading-relaxed text-film-400">
              Fotografia de casais, famílias, retratos e eventos. Cacoal, desde 2024.
            </p>
          </div>

          {/* Cenas */}
          <div className="pt-8">
            <p className="mb-4 font-hud text-[9px] uppercase tracking-hud text-film-grey">Cenas</p>
            <ul className="flex flex-col">
              {navegar.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="flex min-h-[44px] items-center font-body text-sm text-film-400 transition-colors duration-300 hover:text-film-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="pt-8">
            <p className="mb-4 font-hud text-[9px] uppercase tracking-hud text-film-grey">Contato</p>
            <div className="flex flex-col font-body text-sm text-film-400">
              <a href="tel:+5569992527366" className="flex min-h-[44px] items-center transition-colors duration-300 hover:text-film-white">(69) 99252-7366</a>
              <a href="mailto:zp.studio10@gmail.com" className="flex min-h-[44px] items-center break-all transition-colors duration-300 hover:text-film-white">zp.studio10@gmail.com</a>
              <span className="mt-2 font-hud text-[10px] uppercase tracking-hud text-film-grey">Seg–Sex · 9h–18h</span>
            </div>
          </div>

          {/* Social */}
          <div className="pt-8">
            <p className="mb-4 font-hud text-[9px] uppercase tracking-hud text-film-grey">Sigam</p>
            <div className="-ml-3 flex items-center gap-1">
              <a href="https://instagram.com/zp.studio_oficial" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center text-film-grey transition-colors duration-300 hover:text-film-white">
                <Instagram size={18} />
              </a>
              <a href="mailto:zp.studio10@gmail.com" aria-label="E-mail" className="flex h-11 w-11 items-center justify-center text-film-grey transition-colors duration-300 hover:text-film-white">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-8 sm:flex-row" style={{ borderTop: "1px solid var(--film-line)" }}>
          <p className="font-hud text-[10px] uppercase tracking-hud text-film-grey">
            © {new Date().getFullYear()} ZP Studio
          </p>
          <p className="font-hud text-[10px] uppercase tracking-hud text-film-grey">35mm · Cacoal · Brasil</p>
        </div>
      </div>
    </footer>
  );
}
