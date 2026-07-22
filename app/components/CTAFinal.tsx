"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText, MQ_MOTION } from "@/lib/gsap";

/**
 * O momento bold do site.
 *
 * Um filme queima e estoura em branco. Ao entrar, a seção inverte: fundo
 * branco, texto preto — o único ponto do site que abandona o preto. É a
 * virada emocional antes do contato. (Substitui o antigo fundo vermelho.)
 */
export default function CTAFinal() {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = raiz.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(MQ_MOTION, () => {
        const titulo = el.querySelector<HTMLElement>("[data-titulo]");
        const split = titulo ? SplitText.create(titulo, { type: "lines", mask: "lines" }) : null;

        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 62%", once: true },
        });

        // O estouro: um flash branco cobre e some, deixando a seção invertida.
        tl.fromTo(
          "[data-flash]",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.12, ease: "none" },
        )
          .to("[data-flash]", { autoAlpha: 0, duration: 0.5, ease: "shutter" }, "+=0.02");

        if (split) {
          tl.from(split.lines, { yPercent: 115, duration: 1, ease: "cut", stagger: 0.08 }, 0.1);
        }
        tl.from("[data-sobe]", { y: 20, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, 0.5);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
          split?.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: raiz },
  );

  return (
    <section
      ref={raiz}
      className="relative overflow-hidden bg-film-white px-6 py-32 text-film-black sm:py-44 md:px-14"
    >
      {/* Flash de estouro */}
      <div data-flash aria-hidden className="pointer-events-none absolute inset-0 z-20 bg-white opacity-0" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p data-sobe className="mb-10 font-hud text-[10px] uppercase tracking-hud text-film-black/50">
          Fim do rolo — comece o seu
        </p>

        <h2
          data-titulo
          className="font-display uppercase leading-[0.86] text-film-black"
          style={{ fontSize: "clamp(3rem, 11vw, 9rem)" }}
        >
          <span className="block">Vamos</span>
          <span className="block">gravar isso.</span>
        </h2>

        <p data-sobe className="mx-auto mt-10 max-w-md font-body text-sm leading-relaxed text-film-black/60">
          As agendas fecham cedo. Escolha a data enquanto ela existe.
        </p>

        <div data-sobe className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#contato"
            className="bg-film-black px-10 py-4 font-hud text-[11px] uppercase tracking-hud text-film-white transition-colors duration-300 hover:bg-film-black/80"
          >
            Agendar ensaio
          </a>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-film-black/30 px-10 py-4 font-hud text-[11px] uppercase tracking-hud text-film-black transition-colors duration-300 hover:bg-film-black hover:text-film-white"
          >
            WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}
