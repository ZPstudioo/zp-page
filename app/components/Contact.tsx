"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MapPin, Mail, Instagram } from "lucide-react";
import Eyebrow from "./film/Eyebrow";
import { contato, links } from "@/lib/site";

const canais = [
  { href: links.whatsapp, label: "WhatsApp", sub: contato.telefone },
  { href: links.email, label: "E-mail", sub: contato.email },
  { href: links.instagram, label: "Instagram", sub: `@${contato.instagram}` },
];

export default function Contact() {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-reveal]", {
        y: 26,
        autoAlpha: 0,
        duration: 0.9,
        ease: "cut",
        stagger: 0.08,
        scrollTrigger: { trigger: raiz.current, start: "top 75%", once: true },
      });
    },
    { scope: raiz },
  );

  return (
    <section
      id="contato"
      ref={raiz}
      className="relative px-6 py-20 md:py-40 md:px-14"
      style={{ borderTop: "1px solid var(--film-line)" }}
    >
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1fr_1fr]">
        <div>
          <div data-reveal>
            <Eyebrow cena="Cena 07">Contato</Eyebrow>
          </div>
          <h2
            data-reveal
            className="font-display text-4xl uppercase leading-[0.94] text-film-white sm:text-5xl sm:leading-[0.94] lg:text-6xl lg:leading-[0.94]"
          >
            Marque a<br />primeira cena.
          </h2>
          <p data-reveal className="mt-6 max-w-sm font-body text-sm leading-relaxed text-film-grey">
            Conte o que você quer registrar. Respondo em até 24 horas, com data e
            proposta.
          </p>

          <div data-reveal className="mt-8 flex items-center gap-3 font-hud text-[10px] uppercase tracking-hud text-film-grey">
            <MapPin size={13} aria-hidden />
            Cacoal, RO · Brasil
          </div>
        </div>

        {/* Canais */}
        <div className="flex flex-col justify-end">
          <ul style={{ borderTop: "1px solid var(--film-line)" }}>
            {canais.map((c) => (
              <li key={c.label} data-reveal>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 py-6"
                  style={{ borderBottom: "1px solid var(--film-line)" }}
                >
                  <span className="text-film-grey transition-colors duration-300 group-hover:text-film-white">
                    {c.label === "Instagram" ? <Instagram size={16} /> : c.label === "E-mail" ? <Mail size={16} /> : (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                      </svg>
                    )}
                  </span>
                  <div className="flex-1">
                    <p className="font-body text-sm text-film-white">{c.label}</p>
                    <p className="mt-0.5 font-hud text-[10px] tracking-wide text-film-grey">{c.sub}</p>
                  </div>
                  <span className="font-hud text-film-grey transition-transform duration-300 group-hover:translate-x-1 group-hover:text-film-white">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
