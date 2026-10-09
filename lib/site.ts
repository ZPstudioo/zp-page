/**
 * ═══════════════════════════════════════════════════════════════
 * DADOS DO SITE — domínio e contatos num lugar só
 * ═══════════════════════════════════════════════════════════════
 *
 * Comprou o domínio? Troque `DOMINIO` abaixo, faça o push e pronto:
 * metadata, Open Graph, Schema.org, sitemap e robots passam a usá-lo.
 *
 * Enquanto `DOMINIO` estiver vazio, o site usa o endereço de produção
 * que o Vercel dá ao projeto (`*.vercel.app`) — assim a prévia do link
 * no WhatsApp já funciona antes do domínio existir.
 */

/** Ex.: "zpstudio.com.br" — sem "https://" e sem barra no fim. */
const DOMINIO = "";

function urlBase(): string {
  if (DOMINIO) return `https://${DOMINIO}`;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const URL_SITE = urlBase();

export const contato = {
  whatsapp: "5569992527366",
  telefone: "(69) 99252-7366",
  email: "zp.studio10@gmail.com",
  instagram: "zp.studio_oficial",
  horario: "Seg–Sex · 9h–18h",
  endereco: {
    rua: "Av. Sete de Setembro, 2485, Andar 3, Apt 10, Centro",
    cep: "76963-871",
    cidade: "Cacoal",
    uf: "RO",
  },
};

export const links = {
  whatsapp: `https://wa.me/${contato.whatsapp}`,
  telefone: `tel:+${contato.whatsapp}`,
  email: `mailto:${contato.email}`,
  instagram: `https://www.instagram.com/${contato.instagram}`,
};
