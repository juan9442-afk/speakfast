'use client';

// ENTREVISTA — el loop central (ver 56 M0). Sarah hace 5 preguntas encadenadas,
// el usuario responde 60s cada una, y al final recibe el resultado + su chuleta.
// La voz (TTS) y el análisis real (STT+LLM) se conectan en la Sesión 6 — aquí
// todo es maqueta honesta: el micrófono solo cuenta segundos, los números son
// de ejemplo consistentes con el resto de la app.

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Flame, Mic, Square, Volume2, X } from 'lucide-react';
import { CheckCustom } from '@/components/landing/ui';
import { LineaAnalisis, RingProgress, useCountdown } from '@/components/onboarding/ui';
import { BotonAccion } from '@/components/app/ui';
import { ENTREVISTA_PREGUNTAS, FRASES_ANTIBLOQUEO, PERFIL, UPGRADES_DE_HOY } from '@/lib/mock-app-data';

type Fase = 'intro' | 'pregunta' | 'analizando' | 'resultado' | 'chuleta';

export default function EntrevistaPage() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [fase, setFase] = useState<Fase>('intro');
  const [idx, setIdx] = useState(0);
  const total = ENTREVISTA_PREGUNTAS.length;
  const salir = () => router.push('/app');
  // clave única de transición: cada pregunta cuenta como su propio "paso"
  const faseKey = fase === 'pregunta' ? `pregunta-${idx}` : fase;

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col px-4 pb-8 [font-family:var(--font-body)] text-[var(--text-primary)]">
      <div className="flex h-14 items-center justify-between">
        <button
          type="button"
          onClick={salir}
          aria-label="Salir de la entrevista"
          className="flex size-11 -translate-x-2 items-center justify-center text-[var(--text-tertiary)] [touch-action:manipulation]"
        >
          <X size={20} aria-hidden="true" />
        </button>
        {fase === 'pregunta' && (
          <span className="text-[13px] font-semibold text-[var(--text-tertiary)]">
            Pregunta {idx + 1} de {total}
          </span>
        )}
        <span className="size-11" aria-hidden="true" />
      </div>

      {fase === 'pregunta' && (
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--text-tertiary)_14%,transparent)]">
          <motion.div
            className="h-full rounded-full bg-[var(--accent)]"
            initial={false}
            animate={{ width: `${((idx + 1) / total) * 100}%` }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col pt-6">
        <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={faseKey}
          className="flex flex-1 flex-col"
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
          transition={{ duration: reduce ? 0.15 : 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
        {fase === 'intro' && (
          <div className="flex flex-1 flex-col justify-center gap-6">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
                Entrevista de {PERFIL.rol}
              </p>
              <h1 className="mt-2 text-balance text-[26px] font-bold leading-[1.2] [font-family:var(--font-display)]">
                Sarah te va a hacer <span className="text-[var(--accent)]">{total} preguntas</span>
              </h1>
              <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)]">
                Una tras otra, con cronómetro — como el día real. Al terminar recibes tu puntaje y tu chuleta.
              </p>
            </div>
            <BotonAccion onClick={() => setFase('pregunta')} alto={56}>
              Empezar
            </BotonAccion>
          </div>
        )}

        {fase === 'pregunta' && (
          <Pregunta
            key={idx}
            texto={ENTREVISTA_PREGUNTAS[idx]}
            vozActiva={PERFIL.vozActiva}
            onDone={() => {
              if (idx + 1 < total) setIdx((i) => i + 1);
              else setFase('analizando');
            }}
          />
        )}

        {fase === 'analizando' && <Analizando onDone={() => setFase('resultado')} />}

        {fase === 'resultado' && <Resultado onContinuar={() => setFase('chuleta')} />}

        {fase === 'chuleta' && <Chuleta onCerrar={salir} />}
        </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}

function Pregunta({ texto, vozActiva, onDone }: { texto: string; vozActiva: boolean; onDone: () => void }) {
  const [activo] = useState(true);
  const restante = useCountdown(60, activo, onDone);
  const min = Math.floor(restante / 60);
  const seg = restante % 60;

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_22%,transparent)] bg-[var(--surface)] p-5">
        <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--accent-2)]">
          <Volume2 size={14} aria-hidden="true" />
          Sarah {vozActiva ? 'pregunta' : '(voz desactivada)'}
        </p>
        <p className="mt-2 text-[18px] font-semibold leading-snug">&ldquo;{texto}&rdquo;</p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <span
          aria-hidden="true"
          className="flex size-16 items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--text-tertiary)_25%,transparent)] text-[var(--text-tertiary)]"
        >
          <Mic size={24} aria-hidden="true" />
        </span>
        <p className="text-[32px] font-bold tabular-nums [font-family:var(--font-display)]">
          {min}:{String(seg).padStart(2, '0')}
        </p>
        <p className="max-w-[34ch] text-[15px] text-[var(--text-secondary)]">
          Responde en voz alta mientras corre el tiempo.
        </p>
        <p className="max-w-[34ch] rounded-[var(--radius-button)] bg-[color-mix(in_oklab,var(--accent-2)_8%,transparent)] px-3 py-2 text-[12px] text-[var(--text-secondary)]">
          Demo: la grabación y el análisis de tu voz se activan pronto. Por ahora, avanza con el botón.
        </p>
      </div>

      <button
        type="button"
        onClick={onDone}
        className="mx-auto flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] px-5 py-3 text-[14px] font-semibold [touch-action:manipulation] active:scale-[0.98]"
      >
        <Square size={14} aria-hidden="true" /> {/* avanza sin grabar (demo) */}
        Siguiente pregunta
      </button>
    </div>
  );
}

function Analizando({ onDone }: { onDone: () => void }) {
  const lineas = [
    'Transcribiendo tus 5 respuestas',
    'Midiendo fluidez y pausas',
    'Marcando muletillas',
    'Armando tu chuleta',
  ];
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= lineas.length) {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setN((c) => c + 1), 1100);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10">
      <RingProgress percent={(n / lineas.length) * 100} />
      <h1 className="text-[22px] font-bold [font-family:var(--font-display)]">Analizando tu entrevista…</h1>
      <div className="flex w-full flex-col gap-4" aria-live="polite" aria-busy={n < lineas.length}>
        {lineas.map((l, i) => (
          <LineaAnalisis key={l} texto={l} estado={i < n ? 'completada' : i === n ? 'activa' : 'pendiente'} />
        ))}
      </div>
    </div>
  );
}

function Resultado({ onContinuar }: { onContinuar: () => void }) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-6">
      <div className="text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">Resultado de la entrevista</p>
        {/* Recuadro del dato héroe con filo de terracota (dispositivo ownable de FICHA-ARTE). */}
        <div
          className="mx-auto mt-3 inline-flex flex-col items-center rounded-[var(--radius-card)] border-2 px-8 py-4"
          style={{ borderColor: 'color-mix(in oklab, var(--accent-2) 45%, transparent)' }}
        >
          <p className="text-[56px] font-bold leading-none tabular-nums [font-family:var(--font-display)]">
            74<span className="text-[24px] text-[var(--text-secondary)]">/100</span>
          </p>
          <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
            de fluidez · <span className="font-semibold text-[var(--accent)]">↑ 2 desde la anterior</span>
          </p>
        </div>
      </div>

      <div className="rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_22%,transparent)] bg-[var(--surface)] p-5">
        <ul className="flex flex-col gap-3 text-[15px]">
          <li className="flex items-start gap-3"><CheckCustom /><span>Muletillas: 6 en toda la entrevista (bajaste de 8)</span></li>
          <li className="flex items-start gap-3"><CheckCustom /><span>Pausa por traducción: 2.4s promedio (apunta a menos de 2s)</span></li>
          <li className="flex items-start gap-3"><CheckCustom /><span>Ritmo: 152 palabras/min — dentro del rango bueno</span></li>
          <li className="flex items-start gap-3"><CheckCustom /><span>Índice de Preparación: 41% → <span className="font-semibold">43%</span></span></li>
        </ul>
      </div>

      <BotonAccion onClick={onContinuar} alto={56}>
        Ver mi chuleta
      </BotonAccion>
    </div>
  );
}

function Chuleta({ onCerrar }: { onCerrar: () => void }) {
  const [guardada, setGuardada] = useState(false);
  const [cerrando, setCerrando] = useState(false);
  const reduce = useReducedMotion();

  const terminar = () => {
    setCerrando(true);
    setTimeout(onCerrar, reduce ? 300 : 1500);
  };

  // Celebración SOBRIA al cerrar (FICHA-ARTE: spring 0.1 sólo en hito de racha,
  // nivel contenido/medio — cero confeti infantil).
  if (cerrando) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.35, duration: 0.5 }}
          aria-hidden="true"
          className="flex size-20 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent-2)_14%,transparent)] text-[32px]"
        >
          <Flame size={36} color="var(--accent-2)" aria-hidden="true" />
        </motion.span>
        <p className="text-[22px] font-bold [font-family:var(--font-display)]">Racha de 5 días</p>
        <p className="text-[14px] text-[var(--text-secondary)]">Entrevista guardada. Tu Índice subió a 43%.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--accent-2)]">Tu chuleta de esta entrevista</p>
        <h1 className="mt-2 text-[24px] font-bold leading-tight [font-family:var(--font-display)]">
          Ábrela 5 minutos antes de la llamada real
        </h1>
      </div>

      <section className="rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent-2)_25%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_6%,transparent)] p-5">
        <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--accent-2)]">Frases para no congelarte</p>
        <ul className="mt-3 flex flex-col gap-2 text-[14px]">
          {FRASES_ANTIBLOQUEO.map((f) => (
            <li key={f} className="rounded-[var(--radius-button)] bg-[var(--surface)] px-3 py-2">&ldquo;{f}&rdquo;</li>
          ))}
        </ul>
      </section>

      <section className="rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] bg-[var(--surface)] p-5">
        <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">Vocabulario que subiste hoy</p>
        <ul className="mt-3 flex flex-col gap-3 text-[14px]">
          {UPGRADES_DE_HOY.map((v) => (
            <li key={v.basica}>
              <p className="text-[13px] text-[var(--text-secondary)] line-through decoration-[color-mix(in_oklab,var(--text-tertiary)_50%,transparent)]">
                {v.basica}
              </p>
              <p className="mt-0.5 font-semibold">{v.pro}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-col gap-3">
        <BotonAccion onClick={() => setGuardada(true)} disabled={guardada}>
          {guardada ? '✓ Guardada en tu diccionario' : 'Guardar en mi diccionario'}
        </BotonAccion>
        <BotonAccion onClick={terminar} variante="outline">
          Terminar
        </BotonAccion>
      </div>
    </div>
  );
}
