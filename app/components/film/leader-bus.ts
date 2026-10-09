"use client";

/**
 * Canal entre o Leader e o Hero.
 *
 * O Hero só começa a se revelar quando a contagem termina. Em vez de
 * um contexto React para um único sinal booleano, um módulo com estado:
 * o Hero pergunta "já passou?" antes de assinar, então não existe corrida
 * entre a ordem de montagem dos dois componentes.
 */

import { redeApertada } from "@/lib/dispositivo";

const CHAVE = "zp:leader-visto";
export const EVENTO_LEADER = "zp:leader-pronto";

let pronto = false;

/**
 * O leader é um ritual, não um carregamento — então ele é a primeira coisa
 * a ser sacrificada quando o acesso está caro ou lento. Não roda:
 *   · para quem pediu menos movimento;
 *   · com "economizar dados" ligado ou em rede 2g — 1,2s de contagem antes
 *     do site é luxo que só faz sentido em conexão que já está de pé;
 *   · mais de uma vez por aba.
 */
export function leaderDeveRodar(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (redeApertada()) return false;
  return sessionStorage.getItem(CHAVE) !== "1";
}

export function marcarLeaderVisto() {
  try {
    sessionStorage.setItem(CHAVE, "1");
  } catch {
    // modo privado / storage bloqueado — o leader roda de novo, sem drama
  }
}

export function anunciarLeaderPronto() {
  if (pronto) return;
  pronto = true;
  window.dispatchEvent(new Event(EVENTO_LEADER));
}

/** Chama `fn` assim que o palco estiver livre — agora ou quando o leader sair. */
export function aoLiberarPalco(fn: () => void): () => void {
  if (pronto || !leaderDeveRodar()) {
    pronto = true;
    fn();
    return () => {};
  }
  window.addEventListener(EVENTO_LEADER, fn, { once: true });
  return () => window.removeEventListener(EVENTO_LEADER, fn);
}
