import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  // eslint-plugin-react ainda não detecta a versão sozinho no ESLint 10.
  { settings: { react: { version: "19" } } },
  {
    // three.js muta material e uniform dentro do useFrame por desenho —
    // é assim que o R3F anima sem re-render. A regra não conhece o padrão.
    files: ["components/ui/3d-gallery-photography.tsx"],
    rules: { "react-hooks/immutability": "off" },
  },
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
];

export default config;
