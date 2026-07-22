import type { Config } from "tailwindcss";

/**
 * ZP STUDIO — sistema "35mm"
 *
 * Regra número um: o site não tem cor. A cor vem das fotos.
 * `rec` é a única exceção e existe por função, não por decoração:
 * o ponto de gravação do HUD e o anel de foco (acessibilidade).
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        film: {
          black: "#050505",   // fundo — preto de sala escura
          900:   "#0A0A0A",   // superfícies elevadas
          800:   "#121212",   // hairline forte / hover
          grey:  "#6B6B6B",   // texto secundário
          400:   "#9C9C97",   // texto terciário
          white: "#EDEDE8",   // texto — off-white, filme não tem branco puro
        },
        rec: "#FF3D00",       // só REC + focus-visible

        /* ── Aliases de transição ─────────────────────────────
           Componentes das fases F2–F5 ainda citam estes nomes.
           Remapeados para o sistema novo: o azul some do site
           inteiro de uma vez. Serão apagados na F6.            */
        ink:    { DEFAULT: "#050505", 900: "#0A0A0A", 800: "#121212", 700: "#1A1A1A", 600: "#242424" },
        paper:  "#EDEDE8",
        flash:  "#FF3D00",
        silver: "#6B6B6B",
        mist:   "#6B6B6B",
        frost:  "#EDEDE8",
        galaxy: { 950: "#050505", 900: "#0A0A0A", 800: "#121212" },
        nebula: { 400: "#9C9C97", 500: "#6B6B6B" },
        pulse:  { 400: "#9C9C97", 500: "#6B6B6B" },
        electric: "#EDEDE8",

        // tokens shadcn (usados em /mundo)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted:   { DEFAULT: "hsl(var(--muted))",   foreground: "hsl(var(--muted-foreground))" },
        card:    { DEFAULT: "hsl(var(--card))",    foreground: "hsl(var(--card-foreground))" },
        border:  "hsl(var(--border))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        accent:  { DEFAULT: "hsl(var(--accent))",  foreground: "hsl(var(--accent-foreground))" },
      },

      fontFamily: {
        display: ["var(--font-anton)", "Impact", "sans-serif"],       // títulos
        body:    ["var(--font-archivo)", "system-ui", "sans-serif"],  // corpo
        hud:     ["var(--font-plex-mono)", "ui-monospace", "monospace"], // timecode, numeração
        editorial: ["var(--font-archivo)", "system-ui", "sans-serif"], // alias legado
      },

      letterSpacing: {
        hud:   "0.32em",  // etiquetas do HUD
        label: "0.22em",  // eyebrows
        tight: "-0.02em",
        cine:  "-0.045em", // display gigante — condensada pede aperto
      },

      /* Alturas de letterbox — 2.39:1 é a proporção do cinemascope. */
      spacing: {
        letterbox: "clamp(18px, 3.2vh, 34px)",
      },

      animation: {
        marquee: "marquee 28s linear infinite",
        blink:   "blink 1.4s steps(1) infinite",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 55%":   { opacity: "1" },
          "56%, 100%": { opacity: "0.15" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
