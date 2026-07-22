import { Instagram, Mail } from "lucide-react";

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
        <p className="font-display uppercase leading-[0.82] text-film-800" style={{ fontSize: "clamp(4rem, 20vw, 18rem)" }}>
          ZP Studio
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-14 md:px-14">
        <div className="grid gap-10 py-12 sm:grid-cols-2 md:grid-cols-4" style={{ borderTop: "1px solid var(--film-line)" }}>
          {/* Direção */}
          <div className="pt-8">
            <p className="mb-4 font-hud text-[9px] uppercase tracking-hud text-film-grey">Direção</p>
            <p className="max-w-xs font-body text-sm leading-relaxed text-film-400">
              Fotografia de retratos, casais, gestante e eventos. São Paulo, desde 2016.
            </p>
          </div>

          {/* Cenas */}
          <div className="pt-8">
            <p className="mb-4 font-hud text-[9px] uppercase tracking-hud text-film-grey">Cenas</p>
            <ul className="flex flex-col gap-2.5">
              {navegar.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="font-body text-sm text-film-400 transition-colors duration-300 hover:text-film-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="pt-8">
            <p className="mb-4 font-hud text-[9px] uppercase tracking-hud text-film-grey">Contato</p>
            <div className="flex flex-col gap-2.5 font-body text-sm text-film-400">
              <a href="tel:+5511999999999" className="transition-colors duration-300 hover:text-film-white">(11) 99999-9999</a>
              <a href="mailto:contato@zpstudio.com.br" className="transition-colors duration-300 hover:text-film-white">contato@zpstudio.com.br</a>
              <span className="font-hud text-[10px] uppercase tracking-hud text-film-grey">Seg–Sex · 9h–18h</span>
            </div>
          </div>

          {/* Social */}
          <div className="pt-8">
            <p className="mb-4 font-hud text-[9px] uppercase tracking-hud text-film-grey">Sigam</p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/zp.studio_oficial" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-film-grey transition-colors duration-300 hover:text-film-white">
                <Instagram size={17} />
              </a>
              <a href="mailto:contato@zpstudio.com.br" aria-label="E-mail" className="text-film-grey transition-colors duration-300 hover:text-film-white">
                <Mail size={17} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-8 sm:flex-row" style={{ borderTop: "1px solid var(--film-line)" }}>
          <p className="font-hud text-[10px] uppercase tracking-hud text-film-grey">
            © {new Date().getFullYear()} ZP Studio
          </p>
          <p className="font-hud text-[10px] uppercase tracking-hud text-film-grey">35mm · São Paulo · Brasil</p>
        </div>
      </div>
    </footer>
  );
}
