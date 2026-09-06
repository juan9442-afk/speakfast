'use client';

// KIT DE LA APP INTERNA (Sesión 5). Barra de navegación, tarjetas de dato,
// anillo del Índice de Preparación y gráfica de tendencia — todo con los tokens
// de tokens.css y el mismo lenguaje visual que la landing/onboarding.
// Personalidad (FICHA-ARTE): directo, exigente, en tu esquina — sobrio, sin
// confeti infantil, número héroe grande, verde = "listo/aprobado".

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { animate, motion, useInView, useReducedMotion } from 'motion/react';
import { Dumbbell, LineChart, ListChecks, User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const TABS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/app', label: 'Practicar', icon: Dumbbell },
  { href: '/app/progreso', label: 'Progreso', icon: LineChart },
  { href: '/app/preguntas', label: 'Preguntas', icon: ListChecks },
  { href: '/app/cuenta', label: 'Cuenta', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-[480px] items-stretch border-t border-[color-mix(in_oklab,var(--text-tertiary)_20%,transparent)] bg-[var(--surface)] pb-[max(8px,env(safe-area-inset-bottom))] pt-2"
    >
      {TABS.map((t) => {
        const activo = t.href === '/app' ? pathname === '/app' : pathname.startsWith(t.href);
        const Icono = t.icon;
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={activo ? 'page' : undefined}
            className="flex flex-1 flex-col items-center gap-1 py-1 transition-transform duration-100 [touch-action:manipulation] active:scale-95"
          >
            <Icono
              size={22}
              strokeWidth={activo ? 2.4 : 1.9}
              color={activo ? 'var(--accent)' : 'var(--text-tertiary)'}
              aria-hidden="true"
            />
            <span
              className={`text-[11px] font-semibold ${
                activo ? 'text-[var(--accent)]' : 'text-[var(--text-tertiary)]'
              }`}
            >
              {t.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

/** Contenedor de página de la app: columna centrada, deja aire para la bottom-nav. */
export function AppScreen({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-[480px] px-4 pb-28 pt-4 [font-family:var(--font-body)] text-[var(--text-primary)]">
      {children}
    </main>
  );
}

export function ScreenTitle({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <header className="mb-6">
      <h1 className="text-[26px] font-bold leading-tight [font-family:var(--font-display)]">{children}</h1>
      {sub && <p className="mt-1 text-[14px] text-[var(--text-secondary)]">{sub}</p>}
    </header>
  );
}

/* ── <NumeroContado> — número héroe que cuenta 0→valor al entrar en viewport. ── */
export function NumeroContado({
  to,
  suffix = '',
  className = '',
  duration = 0.8,
}: {
  to: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const enVista = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [valor, setValor] = useState(0);
  useEffect(() => {
    if (!enVista) return;
    if (reduce) {
      setValor(to);
      return;
    }
    const c = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValor(Math.round(v)),
    });
    return () => c.stop();
  }, [enVista, to, duration, reduce]);
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {valor}
      {suffix}
    </span>
  );
}

/* ── <IndiceRing> — anillo grande del Índice de Preparación (dato héroe del home). ── */
export function IndiceRing({ percent, size = 160 }: { percent: number; size?: number }) {
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const reduce = useReducedMotion();
  const ref = useRef<SVGCircleElement>(null);
  const enVista = useInView(ref, { once: true, amount: 0.6 });
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
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
          ref={ref}
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: enVista ? c - (c * percent) / 100 : c }}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[44px] font-bold leading-none tabular-nums [font-family:var(--font-display)]">
          <NumeroContado to={percent} />
          <span className="text-[18px] text-[var(--text-secondary)]">%</span>
        </span>
        <span className="mt-1 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
          listo
        </span>
      </div>
    </div>
  );
}

/* ── <StatCard> — dato de apoyo con etiqueta y delta opcional. ── */
export function StatCard({
  label,
  value,
  delta,
  deltaTone = 'good',
}: {
  label: string;
  value: ReactNode;
  delta?: string;
  deltaTone?: 'good' | 'muted';
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] bg-[var(--surface)] p-4 shadow-[var(--shadow-1)]">
      <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">{label}</p>
      <p className="mt-1 text-[22px] font-bold tabular-nums [font-family:var(--font-display)]">{value}</p>
      {delta && (
        <p
          className={`mt-0.5 text-[12px] font-semibold ${
            deltaTone === 'good' ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'
          }`}
        >
          {delta}
        </p>
      )}
    </div>
  );
}

/* ── <TrendChart> — gráfica de área de la fluidez en el tiempo, se DIBUJA al
   entrar (17-VISUALIZACION-DATOS: mínima tinta, colores de la app, animada). ── */
export function TrendChart({ data, height = 120 }: { data: number[]; height?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const enVista = useInView(ref, { once: true, amount: 0.5 });

  // Con menos de 2 puntos no hay tendencia que dibujar (evita Math.min([])=Infinity
  // y división por (length-1)=0).
  if (data.length < 2) {
    return (
      <div
        style={{ height }}
        className="flex items-center justify-center rounded-[var(--radius-button)] border border-dashed border-[color-mix(in_oklab,var(--text-tertiary)_28%,transparent)] text-[13px] text-[var(--text-tertiary)]"
      >
        Tu curva aparece a partir de la 2ª entrevista.
      </div>
    );
  }

  const w = 320;
  const pad = 8;
  const min = Math.min(...data) - 6;
  const max = Math.max(...data) + 6;
  const pts = data.map((v, i) => {
    const x = pad + (i * (w - pad * 2)) / (data.length - 1);
    const y = pad + (1 - (v - min) / (max - min)) * (height - pad * 2);
    return [x, y] as const;
  });
  const linePath = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L${pts[pts.length - 1][0].toFixed(1)} ${height - pad} L${pts[0][0].toFixed(1)} ${height - pad} Z`;
  return (
    <svg ref={ref} viewBox={`0 0 ${w} ${height}`} className="w-full" role="img" aria-label="Tu fluidez en las últimas entrevistas">
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={areaPath}
        fill="url(#trendFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: enVista ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.3 }}
      />
      <motion.path
        d={linePath}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: enVista ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
      {pts.map(([x, y], i) =>
        i === pts.length - 1 ? (
          <circle key={i} cx={x} cy={y} r={3.5} fill="var(--accent)" />
        ) : null
      )}
    </svg>
  );
}

/* ── <EmptyState> — hueco con mensaje + (opcional) CTA. Nunca "No hay datos". ── */
export function EmptyState({
  titulo,
  detalle,
  cta,
}: {
  titulo: string;
  detalle?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-dashed border-[color-mix(in_oklab,var(--text-tertiary)_28%,transparent)] px-5 py-8 text-center">
      <p className="text-[15px] font-semibold">{titulo}</p>
      {detalle && <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-secondary)]">{detalle}</p>}
      {cta && (
        <Link
          href={cta.href}
          className="mt-4 inline-flex h-11 items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] px-5 text-[14px] font-semibold text-[var(--bg)] [touch-action:manipulation] active:scale-[0.98]"
        >
          {cta.label}
        </Link>
      )}
    </div>
  );
}

const ESTADO_MAP = {
  'dominada': { label: 'Dominada', cls: 'bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] text-[var(--accent)]' },
  'en-progreso': { label: 'En progreso', cls: 'bg-[color-mix(in_oklab,var(--accent-2)_14%,transparent)] text-[var(--accent-2)]' },
  'sin-practicar': { label: 'Sin practicar', cls: 'bg-[color-mix(in_oklab,var(--text-tertiary)_16%,transparent)] text-[var(--text-secondary)]' },
} as const;

export function EstadoBadge({ estado }: { estado: keyof typeof ESTADO_MAP }) {
  const m = ESTADO_MAP[estado];
  return (
    <span className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.04em] ${m.cls}`}>
      {m.label}
    </span>
  );
}

/* ── <BotonAccion> — CTA sólido de la app (mismo lenguaje que el kit de landing). ── */
export function BotonAccion({
  children,
  onClick,
  href,
  alto = 52,
  disabled = false,
  variante = 'solid',
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  alto?: 48 | 52 | 56;
  disabled?: boolean;
  variante?: 'solid' | 'outline';
}) {
  const cls = `flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] px-6 text-[16px] font-semibold transition-[transform,opacity] duration-150 [touch-action:manipulation] active:scale-[0.98] active:opacity-90 ${
    variante === 'outline'
      ? 'border border-[color-mix(in_oklab,var(--accent)_45%,transparent)] text-[var(--accent)]'
      : 'bg-[var(--accent)] text-[var(--bg)] shadow-[0_8px_30px_color-mix(in_oklab,var(--accent)_22%,transparent)]'
  } ${disabled ? 'opacity-[0.5]' : ''} ${alto === 56 ? 'h-14' : alto === 48 ? 'h-12' : 'h-[52px]'}`;
  if (href && !disabled) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <motion.button type="button" whileTap={disabled ? undefined : { scale: 0.97 }} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </motion.button>
  );
}
