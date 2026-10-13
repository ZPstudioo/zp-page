import type { Metadata } from "next";
import { Anton, Archivo, IBM_Plex_Mono } from "next/font/google";
import { URL_SITE, contato, links } from "@/lib/site";
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
  metadataBase: new URL(URL_SITE),
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
    url: "/",
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
  alternates: { canonical: "/" },
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
                "Estúdio de fotografia em Cacoal. Casais, famílias, retratos e eventos.",
              image: `${URL_SITE}/og-image.jpg`,
              logo: `${URL_SITE}/logo/zp-logo.png`,
              foundingDate: "2024",
              areaServed: { "@type": "City", name: `${contato.endereco.cidade} - ${contato.endereco.uf}` },
              address: {
                "@type": "PostalAddress",
                streetAddress: contato.endereco.rua,
                postalCode: contato.endereco.cep,
                addressLocality: contato.endereco.cidade,
                addressRegion: contato.endereco.uf,
                addressCountry: "BR",
              },
              telephone: `+${contato.whatsapp}`,
              email: contato.email,
              url: URL_SITE,
              sameAs: [links.instagram],
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
