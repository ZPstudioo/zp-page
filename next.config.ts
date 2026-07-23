import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Há um package-lock.json solto em C:\Users\João — sem isto o Turbopack
  // elege a pasta do usuário como raiz do workspace.
  turbopack: { root: import.meta.dirname },
  images: {
    // Todas as fotos são locais (`public/fotos/`) desde a entrega do acervo
    // real. Sem `remotePatterns`: nenhuma origem externa é permitida.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
