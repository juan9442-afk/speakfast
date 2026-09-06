import Link from 'next/link';
import { Isotipo } from '@/components/brand';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col items-center justify-center gap-4 px-6 text-center [font-family:var(--font-body)] text-[var(--text-primary)]">
      <Isotipo size={40} />
      <h1 className="text-[24px] font-bold [font-family:var(--font-display)]">Esta página no existe</h1>
      <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]">
        El enlace que abriste no lleva a ningún lado. Vuelve al inicio y sigue desde ahí.
      </p>
      <Link
        href="/"
        className="flex h-12 items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] px-6 text-[15px] font-semibold text-[var(--bg)] [touch-action:manipulation]"
      >
        Ir al inicio
      </Link>
    </main>
  );
}
