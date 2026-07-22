"use client";

/**
 * Canal entre o Leader e o Hero.
 *
 * O Hero só começa a se revelar quando a contagem termina. Em vez de
 * um contexto React para um único sinal booleano, um módulo com estado:
 * o Hero pergunta "já passou?" antes de assinar, então não existe corrida
 * entre a ordem de montagem dos dois componentes.
 */

const CHAVE = "zp:leader-visto";
export const EVENTO_LEADER = "zp:leader-pronto";

let pronto = false;

/** O leader só roda uma vez por aba — e nunca para quem pediu menos movimento. */
export function leaderDeveRodar(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return sessionStorage.getItem(CHAVE) !== "1";
}

export function marcarLeaderVisto() {
  try {
    sessionStorage.setItem(CHAVE, "1");
  } catch {
    // modo privado / storage bloqueado — o leader roda de novo, sem drama
  }
}

export function leaderJaPassou() {
  return pronto;
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
