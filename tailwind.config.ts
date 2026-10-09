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
          line:  "rgba(237, 237, 232, 0.12)", // hairline
        },
        rec: "#FF3D00",       // só REC + focus-visible
      },

      fontFamily: {
        display: ["var(--font-anton)", "Impact", "sans-serif"],       // títulos
        body:    ["var(--font-archivo)", "system-ui", "sans-serif"],  // corpo
        hud:     ["var(--font-plex-mono)", "ui-monospace", "monospace"], // timecode, numeração
      },

      letterSpacing: {
        hud:   "0.32em",  // etiquetas do HUD
        label: "0.22em",  // eyebrows
        cine:  "-0.045em", // display gigante — condensada pede aperto
      },

      animation: {
        blink:   "blink 1.4s steps(1) infinite",
      },
      keyframes: {
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
