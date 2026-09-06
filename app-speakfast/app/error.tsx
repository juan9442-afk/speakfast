'use client';

// Error Boundary de sección (UX regla 18): la app nunca muestra pantalla blanca.
// Next lo monta cuando un Server/Client Component de este árbol lanza.

import { useEffect } from 'react';
import { Isotipo } from '@/components/brand';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Enganchar aquí el reporte de errores (Sentry/consola del proveedor) en Sesión 7.
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col items-center justify-center gap-4 px-6 text-center [font-family:var(--font-body)] text-[var(--text-primary)]">
      <Isotipo size={40} />
      <h1 className="text-[24px] font-bold [font-family:var(--font-display)]">Algo se rompió de nuestro lado</h1>
      <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]">
        No es tu conexión. Vuelve a intentarlo; si sigue igual, escríbenos.
      </p>
      <button
        type="button"
        onClick={reset}
        className="flex h-12 items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] px-6 text-[15px] font-semibold text-[var(--bg)] [touch-action:manipulation] active:scale-[0.98]"
      >
        Reintentar
      </button>
    </main>
  );
}
