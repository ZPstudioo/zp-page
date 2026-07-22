import { Instagram, Mail } from "lucide-react";

const footerLinks = [
  { label: "Sobre",       href: "#sobre" },
  { label: "Portfólio",   href: "#portfolio" },
  { label: "Serviços",    href: "#servicos" },
  { label: "Processo",    href: "#processo" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato",     href: "#contato" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #050505 0%, #0A0A0A 100%)",
        borderTop: "1px solid rgba(237,237,232,0.08)",
      }}
    >
      {/* Top glow line */}
      <div
        className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(237,237,232,0.25) 50%, transparent 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <a href="#" className="flex items-center gap-2">
              <span className="font-display text-xl font-bold tracking-[0.2em] text-white">ZP</span>
              <span className="font-display text-xl font-bold text-flash">.</span>
              <span className="font-body text-silver/50 text-[0.55rem] tracking-[0.45em] uppercase mt-px">Studio</span>
            </a>
            <p className="font-body text-silver/50 text-sm leading-relaxed max-w-xs">
              Fotografia com alma e intenção. Cada ensaio é um momento único
              transformado em memória eterna.
            </p>
            <div className="flex items-center gap-4 pt-1">
              <a
                href="https://instagram.com/zp.studio_oficial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-silver/30 hover:text-nebula-400 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="mailto:contato@zpstudio.com.br"
                className="text-silver/30 hover:text-nebula-400 transition-colors duration-200"
                aria-label="E-mail"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="font-body text-silver/25 text-[0.58rem] tracking-[0.45em] uppercase mb-5">
              Navegação
            </p>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-silver/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-silver/25 text-[0.58rem] tracking-[0.45em] uppercase mb-5">
              Contato
            </p>
            <div className="flex flex-col gap-3 font-body text-silver/50 text-sm">
              <p>São Paulo, SP — Brasil</p>
              <a href="tel:+5511999999999" className="hover:text-white transition-colors">
                (11) 99999-9999
              </a>
              <a href="mailto:contato@zpstudio.com.br" className="hover:text-white transition-colors">
                contato@zpstudio.com.br
              </a>
              <p className="text-silver/25 text-xs mt-1">Seg — Sex · 9h às 18h</p>
            </div>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(237,237,232,0.06)" }}
        >
          <p className="font-body text-silver/20 text-xs">
            © {new Date().getFullYear()} ZP Studio. Todos os direitos reservados.
          </p>
          <p className="font-body text-silver/15 text-xs">São Paulo, Brasil</p>
        </div>
      </div>
    </footer>
  );
}
