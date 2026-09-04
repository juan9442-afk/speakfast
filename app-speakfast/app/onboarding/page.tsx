import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding — SpeakFast",
};

// Placeholder de ruta: el onboarding real (elegir rol, primera simulación) se
// construye en la Sesión 4 (02B/50). Este stub evita un CTA que lleve a un 404
// mientras la landing (Sesión 3) se cierra y se revisa.
export default function OnboardingPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center [font-family:var(--font-body)] text-[var(--text-primary)]">
      <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
        Próximamente
      </p>
      <h1 className="max-w-[36ch] text-[26px] font-bold leading-tight [font-family:var(--font-display)]">
        El Simulacro de Presión se está construyendo
      </h1>
      <p className="max-w-[48ch] text-[15px] leading-relaxed text-[var(--text-secondary)]">
        Estamos terminando la experiencia de práctica. Vuelve pronto.
      </p>
      <a
        href="/"
        className="mt-2 text-[14px] font-semibold text-[var(--accent)] underline underline-offset-4"
      >
        Volver al inicio
      </a>
    </main>
  );
}
