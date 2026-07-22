/**
 * ═══════════════════════════════════════════════════════════════
 * MANIFESTO ÚNICO DE FOTOS
 * ═══════════════════════════════════════════════════════════════
 *
 * Nenhum componente declara imagem. Todos leem daqui.
 *
 * ┌─ TROCA PELAS FOTOS REAIS ────────────────────────────────┐
 * │ 1. Jogue os arquivos em  public/fotos/                    │
 * │ 2. Troque o `src` de cada item para "/fotos/nome.webp"    │
 * │ 3. Ajuste `ratio` (proporção real do arquivo)             │
 * │ 4. Escreva um `alt` de verdade — é SEO e acessibilidade   │
 * │ Nenhum outro arquivo do projeto precisa mudar.            │
 * └───────────────────────────────────────────────────────────┘
 *
 * ⚠ Os `src` abaixo são PROVISÓRIOS (banco de imagem).
 *   Site de fotógrafo com foto de banco não convence ninguém.
 */

export type Categoria = "Casais" | "Retratos" | "Gestante" | "Eventos";

export interface Foto {
  /** Caminho local (/fotos/…) ou URL provisória. */
  src: string;
  /** Descrição real da cena — nunca "foto 1". */
  alt: string;
  categoria: Categoria;
  /** largura / altura. Evita layout shift (CLS). */
  ratio: number;
  /** Marca as provisórias. Deve ficar vazio quando as reais entrarem. */
  provisoria?: true;
}

const R = { retrato: 2 / 3, paisagem: 3 / 2, quadrado: 1 } as const;

export const fotos: Foto[] = [
  // ── Casais ──────────────────────────────────────────────────
  { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1400&q=85", alt: "Casal abraçado contra a luz do fim de tarde", categoria: "Casais", ratio: R.paisagem, provisoria: true },
  { src: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=1400&q=85", alt: "Casal caminhando em campo aberto", categoria: "Casais", ratio: R.paisagem, provisoria: true },
  { src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=1400&q=85", alt: "Casal em rua urbana ao anoitecer", categoria: "Casais", ratio: R.retrato, provisoria: true },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1400&q=85", alt: "Noivos em retrato aproximado", categoria: "Casais", ratio: R.retrato, provisoria: true },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1400&q=85", alt: "Cerimônia de casamento ao ar livre", categoria: "Casais", ratio: R.paisagem, provisoria: true },

  // ── Retratos ────────────────────────────────────────────────
  { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1400&q=85", alt: "Retrato feminino em luz natural lateral", categoria: "Retratos", ratio: R.retrato, provisoria: true },
  { src: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=1400&q=85", alt: "Retrato em contraste alto sobre fundo escuro", categoria: "Retratos", ratio: R.retrato, provisoria: true },
  { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1400&q=85", alt: "Retrato editorial com olhar direto à câmera", categoria: "Retratos", ratio: R.retrato, provisoria: true },
  { src: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=1400&q=85", alt: "Retrato masculino em ambiente urbano", categoria: "Retratos", ratio: R.retrato, provisoria: true },
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1400&q=85", alt: "Retrato espontâneo em luz suave", categoria: "Retratos", ratio: R.retrato, provisoria: true },

  // ── Gestante ────────────────────────────────────────────────
  { src: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=1400&q=85", alt: "Ensaio de gestante em contraluz", categoria: "Gestante", ratio: R.retrato, provisoria: true },
  { src: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1400&q=85", alt: "Gestante em jardim ao amanhecer", categoria: "Gestante", ratio: R.paisagem, provisoria: true },
  { src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1400&q=85", alt: "Mãos sobre a barriga em detalhe", categoria: "Gestante", ratio: R.quadrado, provisoria: true },
  { src: "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=1400&q=85", alt: "Família aguardando a chegada do bebê", categoria: "Gestante", ratio: R.paisagem, provisoria: true },

  // ── Eventos ─────────────────────────────────────────────────
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=85", alt: "Momento da cerimônia de casamento", categoria: "Eventos", ratio: R.paisagem, provisoria: true },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85", alt: "Brinde durante celebração noturna", categoria: "Eventos", ratio: R.paisagem, provisoria: true },
  { src: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1400&q=85", alt: "Formatura — lançamento dos capelos", categoria: "Eventos", ratio: R.paisagem, provisoria: true },
  { src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1400&q=85", alt: "Convidados dançando na festa", categoria: "Eventos", ratio: R.paisagem, provisoria: true },
];

export const categorias: Categoria[] = ["Casais", "Retratos", "Gestante", "Eventos"];

export const porCategoria = (c: Categoria) => fotos.filter((f) => f.categoria === c);

/** Primeiro frame do filme — a foto do Hero. */
export const heroFoto = fotos[0];

/** Uma capa por categoria, para a lista de serviços. */
export const capas = categorias.map((c) => porCategoria(c)[0]);
