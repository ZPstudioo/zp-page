# ZP Studio

Site do **ZP Studio**, estúdio de fotografia em Cacoal (RO) — casais, famílias,
retratos e eventos.

**[zpstudio.com.br](https://zpstudio.com.br)**

O site é tratado como um filme: grão a 12 fps, letterbox, HUD de câmera e
nenhuma cor própria — a cor vem das fotos.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 3
- GSAP 3 (ScrollTrigger, SplitText, ScrollSmoother, Flip)
- three.js + React Three Fiber na galeria (só desktop)

## Rodando

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
npm run lint
```

## Onde mexer

| Arquivo | O que tem |
|---|---|
| `lib/site.ts` | domínio, WhatsApp, e-mail, Instagram, endereço |
| `lib/photos.ts` | manifesto único de fotos — toda imagem do site sai daqui |
| `tailwind.config.ts` | tokens de cor e tipografia |
| `app/components/` | seções da página, na ordem de `app/page.tsx` |

Foto nova: coloque o `.webp` em `public/fotos/` e registre em `lib/photos.ts`.

## Deploy

Vercel, a cada push na `master`.
