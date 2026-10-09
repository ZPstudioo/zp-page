import type { Metadata } from "next";
import { Anton, Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/* Anton — condensada de peso único. É a voz dos títulos. */
const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
  display: "swap",
});

/* Archivo — grotesca neutra para leitura. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600"],
  display: "swap",
});

/* IBM Plex Mono — timecode, dados de lente, numeração.
   Só o peso 400: nenhum elemento `font-hud` do site usa 500, e cada peso é
   um arquivo a mais disputando o caminho crítico. Sob 4G lento as fontes
   chegam ~300ms antes do primeiro paint — 10KB aqui são visíveis. */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zpstudio.com.br"),
  title: "ZP Studio | Fotografia em Cacoal",
  description:
    "Estúdio de fotografia em Cacoal. Casais, famílias, retratos e eventos — com a luz que cada momento pede. Desde 2024.",
  keywords: [
    "fotografia Cacoal",
    "estúdio de fotografia",
    "ensaio fotográfico",
    "fotógrafo de casamento",
    "ensaio gestante",
    "retrato profissional",
  ],
  authors: [{ name: "ZP Studio" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "ZP Studio | Fotografia em Cacoal",
    description:
      "Casais, famílias, retratos e eventos — com a luz que cada momento pede.",
    siteName: "ZP Studio",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "ZP Studio — Fotografia em Cacoal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZP Studio | Fotografia em Cacoal",
    description: "Casais, famílias, retratos e eventos — com a luz que cada momento pede.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${archivo.variable} ${plexMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PhotographyBusiness",
              name: "ZP Studio",
              description:
                "Estúdio de fotografia profissional especializado em retratos, casais e eventos.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Av. Sete de Setembro, 2485, Andar 3, Apt 10, Centro",
                postalCode: "76963-871",
                addressLocality: "Cacoal",
                addressRegion: "RO",
                addressCountry: "BR",
              },
              telephone: "+55-69-99252-7366",
              email: "zp.studio10@gmail.com",
              url: "https://zpstudio.com.br",
              sameAs: ["https://www.instagram.com/zp.studio_oficial"],
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "09:00",
                  closes: "18:00",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
