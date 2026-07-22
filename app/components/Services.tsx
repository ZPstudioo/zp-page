"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP, MQ_FINE } from "@/lib/gsap";
import { fotos } from "@/lib/photos";
import Eyebrow from "./film/Eyebrow";

/** Um serviço por linha; a foto vem do acervo, por categoria. */
const porCat = (c: string) => fotos.find((f) => f.categoria === c) ?? fotos[0];

const servicos = [
  { titulo: "Casal", desc: "Histórias de dois, sem pose forçada.", preco: "a partir de R$ 600", foto: porCat("Casais") },
  { titulo: "Retrato", desc: "Sua presença traduzida em uma imagem.", preco: "a partir de R$ 400", foto: porCat("Retratos") },
  { titulo: "Gestante", desc: "O tempo da espera, em luz.", preco: "a partir de R$ 700", foto: porCat("Gestante") },
  { titulo: "Eventos", desc: "Casamentos e celebrações, cobertura completa.", preco: "sob consulta", foto: porCat("Eventos") },
];

export default function Services() {
  const raiz = useRef<HTMLElement>(null);
  const [ativo, setAtivo] = useState<number | null>(null);

  // Reveal das linhas + a foto de fundo seguindo o mouse (desktop).
  useGSAP(
    () => {
      const el = raiz.current;
      if (!el) return;

      const linhas = gsap.utils.toArray<HTMLElement>("[data-linha]", el);
      gsap.from(linhas, {
        yPercent: 110,
        autoAlpha: 0,
        duration: 0.9,
        ease: "cut",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });

      const mm = gsap.matchMedia();
      mm.add(MQ_FINE, () => {
        const palco = el.querySelector<HTMLElement>("[data-palco]");
        if (!palco) return;
        const x = gsap.quickTo(palco, "x", { duration: 0.9, ease: "power3" });
        const y = gsap.quickTo(palco, "y", { duration: 0.9, ease: "power3" });
        const mover = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          x(e.clientX - r.left);
          y(e.clientY - r.top);
        };
        el.addEventListener("mousemove", mover);
        return () => el.removeEventListener("mousemove", mover);
      });

      return () => mm.revert();
    },
    { scope: raiz },
  );

  return (
    <section
      id="servicos"
      ref={raiz}
      className="relative overflow-hidden px-6 py-28 md:py-40 md:px-14"
      style={{ borderTop: "1px solid var(--film-line)" }}
    >
      {/* Foto flutuante — desktop; segue o mouse e troca por dissolve */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-0 hidden md:block"
        style={{ opacity: ativo !== null ? 1 : 0, transition: "opacity 0.4s ease" }}
      >
        <div data-palco className="relative -translate-x-1/2 -translate-y-1/2">
          <div className="halation relative h-[300px] w-[230px] overflow-hidden bg-film-900">
            {servicos.map((s, i) => (
              <Image
                key={s.titulo}
                src={s.foto.src}
                alt=""
                fill
                sizes="230px"
                className="object-cover transition-opacity duration-300"
                style={{ opacity: ativo === i ? 1 : 0 }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow cena="Cena 03">Serviços</Eyebrow>
            <h2 className="font-display text-4xl uppercase leading-[0.9] text-film-white sm:text-5xl">
              O que filmamos
            </h2>
          </div>
          <p className="max-w-xs font-body text-sm leading-relaxed text-film-grey">
            Quatro modalidades. A mesma exigência em todas.
          </p>
        </div>

        {/* Lista gigante */}
        <ul style={{ borderTop: "1px solid var(--film-line)" }}>
          {servicos.map((s, i) => (
            <li
              key={s.titulo}
              className="mask-line"
              onMouseEnter={() => setAtivo(i)}
              onMouseLeave={() => setAtivo(null)}
            >
              <a
                data-linha
                href="#contato"
                className="group flex items-center gap-5 py-6 md:py-8"
                style={{ borderBottom: "1px solid var(--film-line)" }}
              >
                <span className="w-10 shrink-0 font-hud text-[11px] text-film-grey">
                  0{i + 1}
                </span>

                <span
                  className="flex-1 font-display text-4xl uppercase leading-none text-film-grey transition-colors duration-300 group-hover:text-film-white sm:text-6xl lg:text-7xl"
                >
                  {s.titulo}
                </span>

                <span className="hidden max-w-[16rem] flex-1 font-body text-xs leading-relaxed text-film-grey lg:block">
                  {s.desc}
                </span>

                <span className="shrink-0 font-hud text-[10px] uppercase tracking-hud text-film-400">
                  {s.preco}
                </span>

                <span className="shrink-0 font-hud text-film-grey transition-transform duration-300 group-hover:translate-x-1 group-hover:text-film-white">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
