"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, MQ_MOTION } from "@/lib/gsap";
import { fotos } from "@/lib/photos";
import Eyebrow from "./film/Eyebrow";

/** Uma retrato do acervo para ilustrar o estúdio. */
const retrato = fotos.find((f) => f.categoria === "Retratos") ?? fotos[0];

const numeros = [
  { valor: 128400, sufixo: "", label: "frames capturados" },
  { valor: 500, sufixo: "+", label: "ensaios entregues" },
  { valor: 9, sufixo: "", label: "anos de estrada" },
];

const fmt = (n: number) => n.toLocaleString("pt-BR");

export default function About() {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = raiz.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(MQ_MOTION, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
        });

        // A foto entra por um corte que varre da esquerda — como uma
        // tira sendo puxada sobre a mesa de luz.
        tl.fromTo(
          "[data-foto]",
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "shutter" },
        )
          .from("[data-linha]", { yPercent: 110, duration: 0.9, ease: "cut", stagger: 0.12 }, 0.2)
          .from("[data-para]", { autoAlpha: 0, y: 20, duration: 0.8, stagger: 0.12 }, 0.5);

        // Contadores: sobem de 0 ao valor, arredondando a cada quadro.
        // O HTML já traz o valor final (para quem não tem JS), então o
        // zero é posto no início da timeline — senão o número piscaria
        // do final para o zero antes de começar a contar.
        const counters = gsap.utils.toArray<HTMLElement>("[data-num]", el);
        counters.forEach((node) => {
          const alvo = Number(node.dataset.num);
          if (!Number.isFinite(alvo)) return;
          const sufixo = node.dataset.suf ?? "";
          const obj = { v: 0 };
          tl.set(node, { textContent: "0" + sufixo }, 0)
            .to(
              obj,
              {
                v: alvo,
                duration: 1.6,
                ease: "dolly",
                onUpdate: () => {
                  node.textContent = fmt(Math.round(obj.v)) + sufixo;
                },
              },
              0.6,
            );
        });

        return () => tl.scrollTrigger?.kill();
      });

      return () => mm.revert();
    },
    { scope: raiz },
  );

  return (
    <section
      id="sobre"
      ref={raiz}
      className="relative px-6 py-20 md:py-40 md:px-14"
      style={{ borderTop: "1px solid var(--film-line)" }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-2 lg:gap-24">
        {/* Foto */}
        <div className="relative">
          <div data-foto className="halation relative aspect-[4/3] overflow-hidden bg-film-900 sm:aspect-[4/5]">
            <Image
              src={retrato.src}
              alt={retrato.alt}
              fill
              quality={85}
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <span className="absolute -bottom-3 -right-3 h-9 w-9 border-b border-r border-film-white/40" aria-hidden />
          <span className="absolute right-4 top-4 font-hud text-[9px] uppercase tracking-hud text-film-white/70 mix-blend-difference">
            Still 01
          </span>
        </div>

        {/* Texto */}
        <div>
          <Eyebrow cena="Cena 02">Direção</Eyebrow>

          {/* "É A TÉCNICA." começa com acento: precisa de 1.18 (ver globals.css) */}
          <h2 className="font-display text-4xl uppercase leading-[1.18] text-film-white sm:text-5xl sm:leading-[1.18] lg:text-6xl lg:leading-[1.18]">
            <span className="mask-line">
              <span data-linha className="block">O olhar</span>
            </span>
            <span className="mask-line">
              <span data-linha className="block text-film-grey">é a técnica.</span>
            </span>
          </h2>

          <div className="mt-8 max-w-md space-y-5">
            <p data-para className="font-body text-sm leading-relaxed text-film-400">
              Fotografar não é apertar o botão. É escolher a hora, ler a luz e
              esperar o gesto que ninguém encena. O resto — câmera, lente, edição
              — está a serviço disso.
            </p>
            <p data-para className="font-body text-sm leading-relaxed text-film-grey">
              Cada ensaio é conduzido do briefing à entrega com a mesma
              exigência: nenhuma foto sai do estúdio antes de merecer.
            </p>
          </div>

          {/* Contadores */}
          <dl
            className="mt-12 grid grid-cols-3 gap-6 pt-8"
            style={{ borderTop: "1px solid var(--film-line)" }}
          >
            {numeros.map((n) => (
              <div key={n.label} data-para>
                {/* O valor precisa ir no atributo: sem ele o React escreve
                    `data-num="true"` e a animação lia NaN. */}
                <dd
                  data-num={n.valor}
                  data-suf={n.sufixo}
                  className="font-hud text-xl tabular-nums text-film-white sm:text-2xl lg:text-3xl"
                >
                  {/* Valor final já no HTML: quem não tem JS, ou chega antes
                      da animação, vê o número certo — nunca um zero solto. */}
                  {fmt(n.valor) + n.sufixo}
                </dd>
                <dt className="mt-2 font-hud text-[9px] uppercase leading-relaxed tracking-hud text-film-grey">
                  {n.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
