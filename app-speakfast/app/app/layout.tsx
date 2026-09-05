import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SpeakFast",
};

// Envoltorio común de toda la app interna. La barra de pestañas vive en
// (tabs)/layout.tsx; el flujo de entrevista corre sin barra, a pantalla completa.
export default function AppRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-[var(--bg)]">{children}</div>;
}
