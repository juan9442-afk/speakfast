'use client';

// KIT DE ONBOARDING — ui.tsx
// Piezas compartidas de las pantallas del funnel (pregunta, reconocimiento, demo,
// loading). Blueprint: 50-DISENO-ONBOARDING-PAYWALL.md (secciones A-B). Reusa del
// kit de landing lo que ya es genérico (CtaButton, CheckCustom, IconChip).

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, ChevronLeft, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Isotipo } from '../brand';

/* ── <FunnelHeader> — logo + nombre (siempre vuelve a "/") + atrás/cierre opcional.
   Regla de marca de 50: SIEMPRE visible en onboarding/paywall/login. onBack (chevron,
   retrocede un paso) y onClose (X, sale del funnel — item (1) obligatorio del
   paywall en 50 C1) son mutuamente excluyentes; si no se pasa ninguno, el logo
   central sigue siendo la salida (regla de marca: "vuelve a /"). ── */
export function FunnelHeader({
  appName,
  onBack,
  onClose,
}: {
  appName: string;
  onBack?: () => void;
  onClose?: () => void;
}) {
  return (
    <div className="relative flex h-14 items-center justify-between">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="Atrás"
          className="flex size-11 -translate-x-2 items-center justify-center text-[var(--text-tertiary)] [touch-action:manipulation]"
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </button>
      ) : onClose ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="flex size-11 -translate-x-2 items-center justify-center text-[var(--text-tertiary)] [touch-action:manipulation]"
        >
          <X size={20} aria-hidden="true" />
        </button>
      ) : (
        <span />
      )}
      <a
        href="/"
        className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 text-[15px] font-semibold text-[var(--text-primary)] [font-family:var(--font-display)]"
      >
        <Isotipo size={20} />
        {appName}
      </a>
      <span className="size-11" aria-hidden="true" />
    </div>
  );
}

/* ── <ProgressBar> — línea fina 2-3px, % real, NUNCA dots (50 A2).
   Arranca en 5-8% (efecto Zeigarnik) y anima cada avance. ── */
export function ProgressBar({ percent }: { percent: number }) {
  const reduce = useReducedMotion();
  const clamped = Math.max(6, Math.min(100, percent));
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-[3px] w-full overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--text-tertiary)_14%,transparent)]"
    >
      <motion.div
        className="h-full rounded-full bg-[var(--accent)]"
        initial={false}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

/* ── <OptionChip> — ancho completo, 56-64px, NUNCA radio buttons desnudos (50 A2).
   selected controla borde+fondo+check; onClick dispara la selección del padre
   (auto-avance o toggle, según el padre decida). ── */
export function OptionChip({
  label,
  icon: Icono,
  selected = false,
  multi = false,
  onClick,
}: {
  label: string;
  icon?: LucideIcon;
  selected?: boolean;
  multi?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      aria-pressed={selected}
      className={`flex min-h-14 w-full items-center gap-3 rounded-[var(--radius-button)] border px-4 py-3 text-left text-[16px] font-medium transition-colors duration-150 [touch-action:manipulation] ${
        selected
          ? 'border-[color-mix(in_oklab,var(--accent)_60%,transparent)] bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] text-[var(--text-primary)]'
          : 'border-[color-mix(in_oklab,var(--text-tertiary)_25%,transparent)] bg-[var(--surface)] text-[var(--text-primary)]'
      }`}
    >
      {Icono && (
        <span
          aria-hidden="true"
          className={`flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-button)] ${
            selected ? 'bg-[color-mix(in_oklab,var(--accent)_16%,transparent)]' : 'bg-[var(--chip-bg)]'
          }`}
        >
          <Icono size={18} strokeWidth={2} color="var(--accent)" aria-hidden="true" />
        </span>
      )}
      <span className="flex-1">{label}</span>
      <span
        aria-hidden="true"
        className={`flex size-5 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${
          selected ? 'scale-100 bg-[var(--accent)]' : 'scale-0 bg-transparent'
        }`}
      >
        <Check size={13} strokeWidth={3} color="var(--bg)" aria-hidden="true" />
      </span>
      {multi && !selected && (
        <span
          aria-hidden="true"
          className="size-5 shrink-0 rounded-full border-2 border-[color-mix(in_oklab,var(--text-tertiary)_35%,transparent)]"
        />
      )}
    </motion.button>
  );
}

/* ── <StepCta> — el CTA "Continuar" DENTRO del onboarding: es una acción de
   estado (avanza el paso), nunca una navegación real, así que es un <button>
   real (no un <a href> como CtaButton del kit de landing, pensado para links). ── */
export function StepCta({
  children,
  onClick,
  disabled = false,
  alto = 52,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  alto?: 52 | 56;
}) {
  return (
    <motion.button
      type="button"
      whileTap={disabled ? undefined : { scale: 0.97, opacity: 0.85 }}
      onClick={onClick}
      disabled={disabled}
      aria-live="polite"
      className={`flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] px-8 text-[17px] font-semibold text-[var(--bg)] shadow-[0_8px_30px_color-mix(in_oklab,var(--accent)_25%,transparent)] transition-opacity duration-150 [touch-action:manipulation] ${
        disabled ? 'opacity-[0.65]' : ''
      } ${alto === 56 ? 'h-14' : 'h-[52px]'}`}
    >
      {children}
    </motion.button>
  );
}

/* ── <StepFrame> — envoltorio de transición entre pasos (50 A4): slide + fade,
   dirección según se avance/retroceda. prefers-reduced-motion → solo cross-fade. ── */
export function StepFrame({
  stepKey,
  direction,
  children,
}: {
  stepKey: string | number;
  direction: 1 | -1;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={stepKey}
        initial={reduce ? { opacity: 0 } : { opacity: 0, x: direction === 1 ? 40 : -40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction === 1 ? -24 : 24 }}
        transition={{ duration: reduce ? 0.15 : 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-1 flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/* ── <RingProgress> — anillo del loading "construyendo tu plan" (50 B1).
   Progresa con mesetas (no linear) — lo controla quien la usa vía `percent`. ── */
export function RingProgress({ percent, size = 112 }: { percent: number; size?: number }) {
  const stroke = 9;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const reduce = useReducedMotion();
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="color-mix(in oklab, var(--accent) 12%, transparent)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={false}
          animate={{ strokeDashoffset: c - (c * percent) / 100 }}
          transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[22px] font-bold tabular-nums text-[var(--text-primary)] [font-family:var(--font-display)]">
        {Math.round(percent)}%
      </div>
    </div>
  );
}

/* ── <LineaAnalisis> — una línea del loading (50 B2): pendiente/activa/completada. ── */
export function LineaAnalisis({
  texto,
  estado,
}: {
  texto: string;
  estado: 'pendiente' | 'activa' | 'completada';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: estado === 'pendiente' ? 0.4 : 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3"
    >
      {estado === 'completada' ? (
        <motion.span
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.3 }}
          aria-hidden="true"
          className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]"
        >
          <Check size={12} strokeWidth={3} color="var(--bg)" aria-hidden="true" />
        </motion.span>
      ) : estado === 'activa' ? (
        <span aria-hidden="true" className="relative flex size-5 shrink-0 items-center justify-center">
          <span className="absolute size-2.5 animate-ping rounded-full bg-[var(--accent)] opacity-60" />
          <span className="size-2.5 rounded-full bg-[var(--accent)]" />
        </span>
      ) : (
        <span
          aria-hidden="true"
          className="size-5 shrink-0 rounded-full border-2 border-[color-mix(in_oklab,var(--text-tertiary)_35%,transparent)]"
        />
      )}
      <span className="text-[15px] leading-snug text-[var(--text-primary)]">{texto}</span>
    </motion.div>
  );
}

/** Timer de cuenta regresiva en segundos — usado por la pantalla de práctica. */
export function useCountdown(totalSeconds: number, activo: boolean, onDone: () => void) {
  const [restante, setRestante] = useState(totalSeconds);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (!activo) return;
    setRestante(totalSeconds);
    const id = setInterval(() => {
      setRestante((r) => {
        if (r <= 1) {
          clearInterval(id);
          doneRef.current();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activo, totalSeconds]);

  return restante;
}
