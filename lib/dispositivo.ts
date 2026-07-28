"use client";

/**
 * Quanto luxo este aparelho aguenta.
 *
 * Até aqui a única pergunta que o site fazia era "a tela é grande?"
 * (`MQ_DESKTOP`). Largura de tela não é potência: um notebook de entrada ou
 * um Chromebook tem tela grande e hardware fraco, e recebia WebGL e
 * ScrollSmoother completos — os dois pedaços mais caros do site.
 *
 * Aqui a pergunta passa a ser sobre o aparelho. Os limiares são de propósito
 * CONSERVADORES: só barram o que é claramente fraco. Um notebook comum de 4
 * núcleos continua recebendo a experiência inteira — a direção do site é
 * visual, e tirar impacto de quem aguenta seria resolver o problema errado.
 *
 * Nenhuma destas APIs existe em todo navegador (o Safari não expõe
 * `deviceMemory` nem `connection`). Ausência de sinal nunca bloqueia nada:
 * na dúvida, o aparelho recebe tudo, e a trava de largura segue valendo.
 */

type Conexao = { saveData?: boolean; effectiveType?: string };

/** Menos que isto é aparelho de entrada, não "aparelho modesto". */
const MIN_NUCLEOS = 2;
const MIN_MEMORIA_GB = 2;

export function redeApertada(): boolean {
  if (typeof navigator === "undefined") return false;
  const c = (navigator as Navigator & { connection?: Conexao }).connection;
  if (!c) return false;
  if (c.saveData) return true;
  return c.effectiveType === "2g" || c.effectiveType === "slow-2g";
}

/**
 * `true` só quando há sinal POSITIVO de fraqueza. Sem informação → `false`.
 */
export function aparelhoFraco(): boolean {
  if (typeof navigator === "undefined") return false;

  const nav = navigator as Navigator & { deviceMemory?: number; connection?: Conexao };

  // `hardwareConcurrency` pode vir 0 ou undefined — só conta se for um
  // número de verdade, senão "desconhecido" viraria "fraco".
  const nucleos = navigator.hardwareConcurrency;
  if (typeof nucleos === "number" && nucleos > 0 && nucleos <= MIN_NUCLEOS) return true;

  const memoria = nav.deviceMemory;
  if (typeof memoria === "number" && memoria > 0 && memoria <= MIN_MEMORIA_GB) return true;

  // Quem ligou "economizar dados" pediu explicitamente para o site ser
  // econômico. WebGL são centenas de KB que ele não pediu.
  if (redeApertada()) return true;

  return false;
}

/** Tela grande, sem "reduzir movimento" E com hardware que aguenta. */
export function podePagarLuxo(mq: string): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(mq).matches && !aparelhoFraco();
}
