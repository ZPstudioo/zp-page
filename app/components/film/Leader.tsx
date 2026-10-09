"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, useGSAP, pausarScroll } from "@/lib/gsap";
import { leaderDeveRodar, marcarLeaderVisto, anunciarLeaderPronto } from "./leader-bus";

/**
 * Academy leader — a contagem que abre um rolo de filme.
 *
 * Não é tela de carregamento com logo girando. É o ritual de projeção:
 * mira, círculo, ponteiro varrendo, 3 · 2 · 1, e o obturador fecha.
 *
 * Dura 1,2s e roda uma vez por aba. Quem pediu menos movimento — ou está
 * em rede cara/lenta — nunca o vê: vai direto para o site.
 *
 * O orçamento de 1,2s não é estético, é de performance: enquanto o leader
 * cobre a tela, o elemento LCP da página (o título do Hero) não pode pintar.
 * Cada 100ms aqui é 100ms de LCP. Três beats de 0,3s + 0,3s de obturador.
 */

const DIGITOS = ["3", "2", "1"];
const POR_DIGITO = 0.3;
const OBTURADOR = 0.3;

export default function Leader() {
  const raiz = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(false);
  const [saiu, setSaiu] = useState(false);

  // Decidido no cliente: sessionStorage e reduced-motion não existem no servidor.
  useEffect(() => {
    if (leaderDeveRodar()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- só existe no cliente
      setAtivo(true);
    } else {
      anunciarLeaderPronto();
    }
  }, []);

  useGSAP(
    () => {
      if (!ativo) return;

      const numero = raiz.current?.querySelector<HTMLElement>("[data-numero]");
      const ponteiro = raiz.current?.querySelector<HTMLElement>("[data-ponteiro]");
      // Sem os elementos não há contagem — e o scroll não pode ficar travado.
      if (!numero || !ponteiro) {
        anunciarLeaderPronto();
        setSaiu(true);
        return;
      }

      // Ninguém rola durante a contagem.
      const overflowAnterior = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      // O smoother pode ainda estar a caminho (chunk sob demanda). `pausarScroll`
      // guarda a intenção e ela é aplicada assim que a instância nascer.
      pausarScroll(true);

      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = overflowAnterior;
          pausarScroll(false);
          marcarLeaderVisto();
          anunciarLeaderPronto(); // idempotente — normalmente já saiu no onStart abaixo
          setSaiu(true);
        },
      });

      tl.from("[data-marca]", { autoAlpha: 0, duration: 0.25, stagger: 0.04 })
        .from("[data-mira]", { scaleX: 0, scaleY: 0, duration: 0.35, ease: "dolly" }, 0);

      DIGITOS.forEach((d, i) => {
        tl.set(numero, { textContent: d }, i * POR_DIGITO)
          .fromTo(
            numero,
            { autoAlpha: 0, scale: 1.25 },
            { autoAlpha: 1, scale: 1, duration: 0.14, ease: "cut" },
            i * POR_DIGITO,
          )
          // O ponteiro varre uma volta inteira por número — é o relógio da contagem.
          .fromTo(
            ponteiro,
            { rotate: 0 },
            { rotate: 360, duration: POR_DIGITO, ease: "none" },
            i * POR_DIGITO,
          );
      });

      // Obturador: fecha de cima para baixo.
      tl.to(raiz.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: OBTURADOR,
        ease: "shutter",
        // O palco é liberado quando o obturador COMEÇA a abrir, não quando
        // termina. Duas razões: a cortina passa a revelar um site já em
        // movimento (em vez de um quadro congelado que só então acorda), e
        // o título do Hero — que é o elemento LCP da página — deixa de
        // esperar mais 0,3s para pintar.
        onStart: anunciarLeaderPronto,
      });

      return () => {
        document.documentElement.style.overflow = overflowAnterior;
        pausarScroll(false);
      };
    },
    { scope: raiz, dependencies: [ativo] },
  );

  if (!ativo || saiu) return null;

  const canto = "font-hud text-[9px] uppercase tracking-hud text-film-grey";

  return (
    <div
      ref={raiz}
      role="status"
      aria-label="Carregando"
      className="fixed inset-0 z-[200] bg-black"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      {/* Mira — as linhas cruzam a tela inteira, como no leader de verdade */}
      <div data-mira className="pointer-events-none absolute inset-0">
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-film-white/10" />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-film-white/10" />
      </div>

      {/* Núcleo */}
      <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inset-0 rounded-full border border-film-white/15" />
        <span className="absolute inset-[38px] rounded-full border border-film-white/10" />

        {/* Ponteiro de varredura */}
        <span
          data-ponteiro
          className="absolute left-1/2 top-1/2 h-px w-[110px] origin-left bg-film-white/45"
        />

        <span
          data-numero
          className="absolute inset-0 flex items-center justify-center font-display text-[110px] leading-none text-film-white"
        >
          3
        </span>
      </div>

      {/* Cantos */}
      <div data-marca className={`absolute left-5 top-5 ${canto}`}>ZP·STUDIO</div>
      <div data-marca className={`absolute right-5 top-5 ${canto}`}>SÃO PAULO</div>
      <div data-marca className={`absolute bottom-5 left-5 ${canto}`}>35MM · ISO 400</div>
      <div data-marca className={`absolute bottom-5 right-5 ${canto}`}>ROLO 001</div>
    </div>
  );
}
