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

/* IBM Plex Mono — timecode, dados de lente, numeração. */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zpstudio.com.br"),
  title: "ZP Studio | Fotografia Profissional em São Paulo",
  description:
    "ZP Studio — fotografia de retratos, casais, gestante e eventos em São Paulo. Cada ensaio, uma constelação de memórias eternas.",
  keywords: [
    "fotografia profissional",
    "estúdio de fotografia",
    "ensaio fotográfico",
    "São Paulo",
    "fotógrafo",
  ],
  authors: [{ name: "ZP Studio" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "ZP Studio | Fotografia Profissional em São Paulo",
    description:
      "Cada ensaio, uma constelação de memórias eternas. Fotografia profissional com alma e técnica.",
    siteName: "ZP Studio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ZP Studio — Fotografia Profissional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZP Studio | Fotografia Profissional em São Paulo",
    description:
      "Cada ensaio, uma constelação de memórias eternas. Fotografia profissional com alma e técnica.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${archivo.variable} ${plexMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
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
                addressLocality: "São Paulo",
                addressRegion: "SP",
                addressCountry: "BR",
              },
              telephone: "+55-11-99999-9999",
              email: "contato@zpstudio.com.br",
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
