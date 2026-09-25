import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { WHATSAPP, site } from "@/lib/site";
import { faqs } from "@/lib/content";
import "./globals.css";

/** Archivo es la tipografía de la marca. La mono solo aparece donde hay medida. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-measure",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://automatizasolar.com"),
  alternates: { canonical: "/" },
  title: "Automatiza Solar | El WhatsApp que no contestas lo contesta tu competencia",
  description:
    "Agente de atención y ventas por WhatsApp para empresas de energía solar. Responde al instante sobre tu número de siempre, califica con tu catálogo y agenda la visita. Siete días hábiles, sin permanencia.",
  openGraph: {
    title: "El WhatsApp que no contestas lo contesta tu competencia",
    description:
      "Agente de atención y ventas por WhatsApp para empresas de energía solar. Responde al instante sobre tu número de siempre, califica y agenda la visita.",
    images: ["/brand/og-automatiza-solar.png"],
    url: "https://automatizasolar.com",
    siteName: "Automatiza Solar",
    locale: "es_CO",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-32.png", sizes: "32x32" },
    ],
    apple: "/brand/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#fafaf9",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: site.name,
      description:
        "Agente de atención y ventas por WhatsApp para empresas de energía solar: responde al instante, califica con tu catálogo y agenda la visita técnica.",
      telephone: `+${WHATSAPP}`,
      email: site.email,
      url: "https://automatizasolar.com",
      areaServed: { "@type": "Country", name: "Colombia" },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" className={`${archivo.variable} ${mono.variable} antialiased`}>
      <body>
        <SmoothScroll />
        {children}
        <script
          type="application/ld+json"
          // Datos estructurados. Contenido propio, no entrada de usuario.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
