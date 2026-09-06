'use client';

// MI PROGRESO — tendencia de fluidez, racha, récords, historial de entrevistas y
// "mi diccionario" (los upgrades de vocabulario acumulados). Datos de ejemplo.

import { AppScreen, EmptyState, NumeroContado, ScreenTitle, StatCard, TrendChart } from '@/components/app/ui';
import {
  FLUIDEZ_HISTORIAL,
  HISTORIAL_ENTREVISTAS,
  INDICE_PREPARACION,
  MI_DICCIONARIO,
  PREGUNTAS_CLAVE,
  RACHA_DIAS,
} from '@/lib/mock-app-data';

export default function ProgresoScreen() {
  const dominadas = PREGUNTAS_CLAVE.filter((q) => q.estado === 'dominada').length;
  const hayHistorial = FLUIDEZ_HISTORIAL.length >= 2;
  const mejorFluidez = FLUIDEZ_HISTORIAL.length ? Math.max(...FLUIDEZ_HISTORIAL) : 0;
  const deltaFluidez = hayHistorial
    ? FLUIDEZ_HISTORIAL[FLUIDEZ_HISTORIAL.length - 1] - FLUIDEZ_HISTORIAL[0]
    : 0;

  return (
    <AppScreen>
      <ScreenTitle sub="Tu evolución entrevista tras entrevista.">Mi progreso</ScreenTitle>

      <section className="rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] bg-[var(--surface)] p-5 shadow-[var(--shadow-1)]">
        <div className="flex items-baseline justify-between">
          <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">Fluidez</p>
          {hayHistorial && (
            <p className="text-[13px] font-semibold text-[var(--accent)]">
              {deltaFluidez >= 0 ? '↑' : '↓'} {Math.abs(deltaFluidez)} pts en {FLUIDEZ_HISTORIAL.length} entrevistas
            </p>
          )}
        </div>
        <div className="mt-3">
          <TrendChart data={FLUIDEZ_HISTORIAL} />
        </div>
      </section>

      <section className="mt-4 grid grid-cols-3 gap-3">
        <StatCard label="Listo" value={<><NumeroContado to={INDICE_PREPARACION} />%</>} />
        <StatCard label="Racha" value={`${RACHA_DIAS} d`} />
        <StatCard label="Mejor" value={`${mejorFluidez}%`} />
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-[16px] font-bold [font-family:var(--font-display)]">Preguntas clave</h2>
        <div className="rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] bg-[var(--surface)] p-4">
          <p className="text-[15px] font-semibold">
            {dominadas} de {PREGUNTAS_CLAVE.length} dominadas
          </p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--text-tertiary)_16%,transparent)]">
            <div
              className="h-full rounded-full bg-[var(--accent)]"
              style={{ width: `${(dominadas / PREGUNTAS_CLAVE.length) * 100}%` }}
            />
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-[16px] font-bold [font-family:var(--font-display)]">Historial de entrevistas</h2>
        {HISTORIAL_ENTREVISTAS.length === 0 ? (
          <EmptyState
            titulo="Todavía no has hecho ninguna entrevista"
            detalle="Haz tu primera y aquí verás tu puntaje, tus muletillas y cómo evolucionas."
            cta={{ label: 'Empezar entrevista', href: '/app/entrevista' }}
          />
        ) : (
          <ul className="flex flex-col gap-2">
          {HISTORIAL_ENTREVISTAS.map((e) => (
            <li
              key={e.id}
              className="flex items-center justify-between rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_16%,transparent)] bg-[var(--surface)] px-4 py-3"
            >
              <span className="text-[14px] text-[var(--text-secondary)]">{e.fecha}</span>
              <span className="flex items-center gap-3 text-[14px]">
                <span className="font-semibold tabular-nums">{e.fluidez}% fluidez</span>
                <span className="tabular-nums text-[var(--text-tertiary)]">{e.muletillas} muletillas</span>
              </span>
            </li>
          ))}
          </ul>
        )}
      </section>

      <section className="mt-6">
        <h2 className="mb-1 text-[16px] font-bold [font-family:var(--font-display)]">Mi diccionario</h2>
        <p className="mb-3 text-[13px] text-[var(--text-secondary)]">
          Frases que subiste de básicas a profesionales. Crece con cada entrevista.
        </p>
        {MI_DICCIONARIO.length === 0 ? (
          <EmptyState
            titulo="Tu diccionario está vacío por ahora"
            detalle="Cada entrevista te deja frases nuevas — de las básicas a cómo suena un profesional."
          />
        ) : (
          <ul className="flex flex-col gap-2">
            {MI_DICCIONARIO.map((v) => (
              <li
                key={v.basica}
                className="rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_16%,transparent)] bg-[var(--surface)] px-4 py-3"
              >
                <p className="text-[13px] text-[var(--text-secondary)] line-through decoration-[color-mix(in_oklab,var(--text-tertiary)_50%,transparent)]">
                  {v.basica}
                </p>
                <p className="mt-0.5 text-[14px] font-semibold">{v.pro}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="mt-6 text-center text-[12px] text-[var(--text-tertiary)]">
        Datos de ejemplo — se llenan de verdad al conectar tu cuenta.
      </p>
    </AppScreen>
  );
}
