# ZP STUDIO — MEMÓRIA DO PROJETO

> Este arquivo é a fonte da verdade do projeto. Leia por inteiro antes de qualquer tarefa.
> Se algum prompt conflitar com ele, este arquivo prevalece.

---

## O QUE É

Site do **ZP Studio**, estúdio de fotografia em São Paulo.
Serve casais, gestante, retratos e eventos.

**Não é** um SaaS. Não é dashboard. Não tem KPI, gráfico, bento de métricas
nem mockup de software. Quem chega aqui quer ver **fotografia** e sentir que
está diante de alguém que sabe olhar.

Objetivo de negócio: transformar visitante em ensaio agendado.

---

## DIREÇÃO VISUAL: "35mm"

O site é **um filme**. O visitante entra numa projeção.

### Regra número um

**O site não tem cor. A cor vem das fotos.**

Cada elemento colorido que se acrescenta rouba força da fotografia — que é
o produto. Não existe cor de marca competindo com a imagem.

Exceção única, e funcional: `#FF3D00` no ponto de REC do HUD e no
`:focus-visible`. Menos de 0,5% da tela. Não use em mais nada.

### Tokens (`tailwind.config.ts`)

| Token | Valor | Uso |
|---|---|---|
| `film-black` | `#050505` | fundo |
| `film-900` | `#0A0A0A` | superfície elevada |
| `film-800` | `#121212` | hover / hairline forte |
| `film-grey` | `#6B6B6B` | texto secundário |
| `film-400` | `#9C9C97` | texto terciário |
| `film-white` | `#EDEDE8` | texto — off-white, filme não tem branco puro |
| `rec` | `#FF3D00` | só REC + focus |

Existem aliases legados (`ink`, `flash`, `silver`, `nebula`…) remapeados para
o sistema novo enquanto as seções F2–F5 não são reescritas. **Não crie nada
novo usando eles** — serão apagados na F6.

### Tipografia

| Papel | Fonte | Onde |
|---|---|---|
| `font-display` | **Anton** | títulos gigantes, caixa alta, `tracking-cine` |
| `font-body` | **Archivo** | parágrafos, botões, navegação |
| `font-hud` | **IBM Plex Mono** | timecode, ISO/lente, numeração `01 / 02` |

### Texturas de filme

- **Grão** (`film/FilmGrain.tsx`): tile de 128px, **12 fps**. Nunca 60 — a 60
  parece chuvisco digital; a 12 parece projeção.
- **Letterbox** (`film/Letterbox.tsx`): barras que cortam a foto sangrada e se
  retraem no primeiro scroll. A altura mora em `--letterbox-h`.
- **HUD** (`film/CameraHUD.tsx`): timecode a 24 fps, `ISO 400 · 35MM · f/1.4`,
  ponto REC. Vive dentro das barras do letterbox.
- **Halation** (`.halation`): brilho quente nas altas luzes, no hover das fotos.
- **Perfuração** (`.sprockets`): furos de negativo 35mm em CSS.
- **Cursor** (`CustomCursor.tsx`): retículo de foco automático — quatro cantos
  que fecham sobre o que é clicável.

### Proibido — já foi reprovado como "cara de IA"

Não reintroduza nada disto, sob nenhum pretexto:

- Azul galáxia (`#08111F`, `#1D4ED8`, `#3B82F6`, `#60A5FA`) e ciano
- Aurora, mesh gradient, blobs radiais, glow colorido
- Glassmorphism, `backdrop-filter`, cards de vidro
- Dot grid de fundo
- Texto com gradiente
- Botões pílula arredondados
- Bento grid de "features"
- Emoji como ícone
- Foto de banco de imagem em produção

---

## STACK

- **Next.js 16** (App Router) · **React 19** · **TypeScript** · **Tailwind 3**
- **GSAP 3.15** + `@gsap/react` — toda a animação
- **three.js** + `@react-three/fiber` — só a galeria
- `framer-motion` / `motion` — **em remoção**. Não escreva código novo com eles.

### Regras de motion

1. Importe sempre de `@/lib/gsap`, nunca de `"gsap"` direto — é lá que os
   plugins são registrados uma vez só.
2. Use o hook `useGSAP` com `scope`. Ele faz o cleanup sozinho e sobrevive ao
   StrictMode do React 19.
3. Eases da casa: `cut` (reveals), `dolly` (câmera), `shutter` (wipes).
   Um filme não tem bounce; tem corte e deslize.
4. Tudo que é caro passa por `gsap.matchMedia()` com `MQ_DESKTOP` / `MQ_MOTION`.
   `prefers-reduced-motion` desliga smoother, scrub, grão e WebGL.
5. Elemento `position: fixed` fica **fora** do `<SmoothScroll>` — o transform
   do ScrollSmoother quebra o fixed.
6. Animar por frame? Escreva no DOM via `ref`. Nunca `setState` a 24/60 fps.

---

## ARQUITETURA

```
app/
  layout.tsx              fontes, metadata, Schema.org
  page.tsx                montagem: overlays fixos + SmoothScroll
  globals.css             tokens CSS, texturas, reset
  components/
    film/                 camada da sala de projeção
      FilmGrain.tsx  Letterbox.tsx  CameraHUD.tsx
    SmoothScroll.tsx      wrapper do ScrollSmoother
    CustomCursor.tsx      retículo de foco
    <Seções>.tsx          Hero, Marquee, About, ...
components/ui/            componentes reaproveitáveis (galeria 3D, globo)
lib/
  gsap.ts                 registro de plugins + eases + media queries
  photos.ts               MANIFESTO ÚNICO DE FOTOS
```

### `lib/photos.ts` é lei

Nenhum componente declara imagem por conta própria. Todos leem do manifesto.
Quando as fotos reais chegarem em `public/fotos/`, troca-se **um arquivo** e o
site inteiro muda. Foto nova = entrada nova ali, nada de `src` solto no JSX.

---

## SEÇÕES (ordem da página)

| # | Seção | Ideia |
|---|---|---|
| 0 | Leader | contagem de rolo de filme, ≤1,2s, só na 1ª visita |
| 1 | Hero | foto sangrada, pin + scrub, título quebrado por SplitText |
| 2 | Film strip | tira com perfuração que reage à velocidade do scroll |
| 3 | Sobre | reveal linha a linha, contadores em mono |
| 4 | Serviços | lista tipográfica gigante, foto troca no hover |
| 5 | Galeria | **o momento WebGL** — arraste, curvatura, filtros com Flip |
| 6 | Processo | pin + scroll horizontal, etapas como cortes de edição |
| 7 | Depoimentos | formato "crítica", troca por dissolve |
| 8 | CTA | inversão para branco — flash de filme queimado |
| 9 | Créditos | contato e footer como créditos finais rolando |

---

## COPY

Vende **o olhar**, não o pacote.
Frase curta. Verbo forte. Zero jargão de agência.
Nada de "soluções", "experiências únicas", "momentos mágicos", "eternizar".

---

## PERFORMANCE (metas, não desejos)

- LCP < 2,0s · CLS 0 · 60 fps no scroll
- `next/image` em tudo; `priority` só no Hero
- WebGL: `dynamic import` + IntersectionObserver, **só desktop**; celular
  recebe scroll horizontal nativo
- ScrollSmoother desligado no toque — o nativo do celular é melhor

## ACESSIBILIDADE

- `prefers-reduced-motion` respeitado de verdade
- Grão, letterbox, HUD e cursor com `aria-hidden`
- `:focus-visible` sempre visível
- Contraste `#EDEDE8` sobre `#050505` = 18:1 (AAA)
- Todo `alt` descreve a cena real — é SEO e é acesso

---

## FLUXO DE TRABALHO

1. Ler este arquivo.
2. Consultar a vault: `C:\Users\João\Documents\cerebroZp`
   Funcionalidade grande: escrever o plano em `.md` lá **antes** de codar.
3. Procurar componente existente antes de criar qualquer coisa.
4. Implementar.
5. Atualizar o changelog: `cerebroZp\Changelog.md`
   Só entrega de valor. Data + 1–2 linhas. Nunca código. Nunca ajuste pequeno.

### Estado da reformulação

Plano completo: `cerebroZp\Reformulacao ZP Studio — Direcao CINEMA (GSAP).md`

- [x] **F0** infra GSAP · `lib/gsap.ts` · `SmoothScroll` · `lib/photos.ts`
- [x] **F1** design system · tokens · fontes · grão · letterbox · HUD · cursor
- [ ] **F2** Leader + Hero
- [ ] **F3** Film strip + Sobre + Serviços
- [ ] **F4** Galeria WebGL
- [ ] **F5** Processo + Depoimentos + CTA + Créditos
- [ ] **F6** fotos reais · `next/image` · SEO · Lighthouse · remover framer-motion

---

## ANTES DE FECHAR QUALQUER TAREFA

✓ Nada de cor fora das fotos ✓ Zero item da lista de proibidos
✓ Importou de `@/lib/gsap` ✓ Passou por `matchMedia`
✓ Imagem veio de `lib/photos.ts` ✓ Mobile conferido
✓ Reduced-motion conferido ✓ Sem `console` esquecido
✓ Changelog, se foi entrega de valor
