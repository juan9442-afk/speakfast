import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar — SpeakFast",
};

// Placeholder de ruta: el login real (magic link/OTP, ver 26-AUTH-MODERNO) se
// construye en la Sesión 4 junto al onboarding y el paywall. Este stub evita
// que el link "Entrar" del header quede muerto mientras se cierra la landing.
export default function EntrarPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center [font-family:var(--font-body)] text-[var(--text-primary)]">
      <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
        Próximamente
      </p>
      <h1 className="max-w-[36ch] text-[26px] font-bold leading-tight [font-family:var(--font-display)]">
        El acceso a tu cuenta se está construyendo
      </h1>
      <p className="max-w-[48ch] text-[15px] leading-relaxed text-[var(--text-secondary)]">
        Si ya compraste SpeakFast, tu acceso llega por correo. Mientras tanto, vuelve al inicio.
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
