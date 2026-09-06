import type { Metadata } from "next";
import { Fraunces, Figtree } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const TITULO = "SpeakFast — Simula tu entrevista de trabajo en inglés";
const DESC =
  "Practica preguntas reales de tu puesto en voz alta, con cronómetro, y recibe al instante tu puntaje de fluidez y las muletillas que te delatan.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITULO,
  description: DESC,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_LA",
    url: SITE_URL,
    siteName: "SpeakFast",
    title: TITULO,
    description: DESC,
  },
  twitter: { card: "summary_large_image", title: TITULO, description: DESC },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-dvh flex flex-col">{children}</body>
    </html>
  );
}
