'use client';

// PREGUNTAS CLAVE — las ~10 de tu rol con su estado (sin practicar / en progreso
// / dominada). Tocar una lleva a practicarla en una entrevista enfocada.
// Colección + goal-gradient atados al valor real (ver 24). Datos de ejemplo.

import { useRouter } from 'next/navigation';
import { AppScreen, EmptyState, EstadoBadge, ScreenTitle } from '@/components/app/ui';
import { PREGUNTAS_CLAVE } from '@/lib/mock-app-data';

const ORDEN = { 'en-progreso': 0, 'sin-practicar': 1, 'dominada': 2 } as const;

export default function PreguntasScreen() {
  const router = useRouter();
  const dominadas = PREGUNTAS_CLAVE.filter((q) => q.estado === 'dominada').length;
  const lista = [...PREGUNTAS_CLAVE].sort((a, b) => ORDEN[a.estado] - ORDEN[b.estado]);

  return (
    <AppScreen>
      <ScreenTitle sub={`${dominadas} de ${PREGUNTAS_CLAVE.length} dominadas · practícalas hasta responderlas en automático`}>
        Preguntas clave
      </ScreenTitle>

      {lista.length === 0 ? (
        <EmptyState
          titulo="Aún no tienes preguntas de tu rol"
          detalle="Elige tu profesión y tu rol para cargar el banco de preguntas."
          cta={{ label: 'Ir a mi cuenta', href: '/app/cuenta' }}
        />
      ) : (
      <ul className="flex flex-col gap-3">
        {lista.map((q) => (
          <li key={q.id}>
            <button
              type="button"
              onClick={() => router.push('/app/entrevista')}
              className="flex w-full items-start gap-3 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] bg-[var(--surface)] p-4 text-left shadow-[var(--shadow-1)] [touch-action:manipulation]"
            >
              <div className="flex-1">
                <p className="text-[15px] font-medium leading-snug">{q.textoEn}</p>
                {q.mejorFluidez !== null && (
                  <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
                    Tu mejor fluidez: <span className="font-semibold text-[var(--text-primary)]">{q.mejorFluidez}%</span>
                  </p>
                )}
              </div>
              <EstadoBadge estado={q.estado} />
            </button>
          </li>
        ))}
      </ul>
      )}
    </AppScreen>
  );
}
