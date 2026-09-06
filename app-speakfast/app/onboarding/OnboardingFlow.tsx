'use client';

// ONBOARDING — flujo completo (blueprint: 50-DISENO-ONBOARDING-PAYWALL.md §A/B).
// 5 preguntas + 1 reconocimiento + demo (primera victoria) + loading + resultado,
// tal como quedó decidido en ESTADO.md ("Secuencia maestra de construcción").
// El análisis de voz es SIMULADO (STT/LLM reales se conectan en la Sesión 6, ver
// SECUENCIA-MAESTRA-CONSTRUCCION.md) — nunca se graba audio real ni se sube a
// ningún lado; el mic solo cuenta segundos en pantalla (honestidad de mockup, 32).

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Briefcase,
  Code2,
  Megaphone,
  Wallet,
  Palette,
  TrendingUp,
  CloudFog,
  Repeat,
  MessageCircleWarning,
  BookOpen,
  Mic,
  Square,
  Lock,
} from 'lucide-react';
import { CheckCustom, CountUpNumber } from '@/components/landing/ui';
import { FunnelHeader, LineaAnalisis, OptionChip, ProgressBar, RingProgress, StepCta, StepFrame, useCountdown } from '@/components/onboarding/ui';
import { savePlan, saveOnboarding } from '@/lib/onboarding-storage';

// Índice de Preparación de PARTIDA, derivado de las respuestas (no un número fijo).
// Modesto a propósito: es el "antes". Sube con la práctica real.
function calcularIndicePartida(intensidad: Intensidad | null, dolores: Dolor[]): number {
  const bonoIntensidad = intensidad === 'intensivo' ? 9 : intensidad === 'estandar' ? 6 : 3;
  const valor = 30 - dolores.length * 3 + bonoIntensidad;
  return Math.max(12, Math.min(42, valor));
}

type Profesion = 'tech' | 'marketing' | 'ventas' | 'finanzas' | 'producto' | 'otra';
type Timing = 'semana' | 'mes' | 'explorando';
type Dolor = 'congelo' | 'traduzco' | 'muletillas' | 'vocabulario';
type Meta = '1500' | '2500' | '3500';
type Intensidad = 'ligero' | 'estandar' | 'intensivo';

const PROFESIONES: { id: Profesion; label: string; icon: typeof Code2 }[] = [
  { id: 'tech', label: 'Desarrollo / Tech', icon: Code2 },
  { id: 'marketing', label: 'Marketing', icon: Megaphone },
  { id: 'ventas', label: 'Ventas', icon: TrendingUp },
  { id: 'finanzas', label: 'Finanzas', icon: Wallet },
  { id: 'producto', label: 'Producto / Diseño', icon: Palette },
  { id: 'otra', label: 'Otra profesión', icon: Briefcase },
];

const SUGERENCIAS_ROL: Record<Profesion, string[]> = {
  tech: ['Frontend Developer', 'Backend Developer', 'Data Analyst'],
  marketing: ['Growth Marketer', 'Content Marketer', 'Performance Marketer'],
  ventas: ['Account Executive', 'SDR / BDR', 'Customer Success'],
  finanzas: ['Analista Financiero', 'Contador', 'Controller'],
  producto: ['Product Manager', 'UX/UI Designer', 'Product Designer'],
  otra: ['Profesional remoto', 'Consultor', 'Especialista'],
};

const TIMING_OPTIONS: { id: Timing; label: string }[] = [
  { id: 'semana', label: 'Esta semana' },
  { id: 'mes', label: 'Este mes' },
  { id: 'explorando', label: 'Todavía explorando' },
];

const DOLORES_OPTIONS: { id: Dolor; label: string; icon: typeof CloudFog }[] = [
  { id: 'congelo', label: 'Se me congela la mente', icon: CloudFog },
  { id: 'traduzco', label: 'Traduzco todo en mi cabeza', icon: Repeat },
  { id: 'muletillas', label: "Uso muchas muletillas ('ehm', 'like')", icon: MessageCircleWarning },
  { id: 'vocabulario', label: 'Me quedo con vocabulario básico', icon: BookOpen },
];

// Ancla al deseo #1 de FICHA-AVATAR.md ("triplicar mi sueldo de $800 a $3,500
// accediendo a vacantes remotas") — los rangos son los de la ficha, no genéricos.
const META_OPTIONS: { id: Meta; label: string }[] = [
  { id: '1500', label: '$1,000 – $1,500 USD/mes' },
  { id: '2500', label: '$1,500 – $2,500 USD/mes' },
  { id: '3500', label: '+$3,000 USD/mes' },
];

// Eco de "Meta diaria seleccionable" (ESTADO.md → Gamificación y retención) —
// se pide ANTES del plan para que loading/paywall la reflejen (50 A6: la
// respuesta se guarda y REAPARECE, eso es lo que la vuelve compromiso).
const INTENSIDAD_OPTIONS: { id: Intensidad; label: string; detalle: string }[] = [
  { id: 'ligero', label: 'Ligero', detalle: '1 pregunta al día' },
  { id: 'estandar', label: 'Estándar', detalle: '1 simulación (3 preguntas) al día' },
  { id: 'intensivo', label: 'Intensivo', detalle: '2 simulaciones al día' },
];

const DEMO_QUESTION = 'Tell me about a challenge you faced at work and how you handled it.';

const STEP_IDS = [
  'profesion',
  'rol',
  'meta',
  'timing',
  'reconocimiento',
  'dolores',
  'intensidad',
  'demo-intro',
  'demo-grabando',
  'loading',
  'resultado',
] as const;
type StepId = (typeof STEP_IDS)[number];

function reconocimientoTexto(rol: string, timing: Timing | null): string {
  if (timing === 'semana') {
    return `Como tu entrevista es esta semana, tu banco de preguntas para ${rol} se enfoca en lo que más se repite — sin rodeos.`;
  }
  if (timing === 'mes') {
    return `Con un mes por delante, alcanzas a entrenar tus muletillas hasta que desaparezcan antes del día real.`;
  }
  return `Aunque todavía no tengas fecha, cada práctica de hoy queda guardada para cuando aparezca la vacante de ${rol}.`;
}

export function OnboardingFlow({ plan }: { plan?: string }) {
  const router = useRouter();

  useEffect(() => {
    if (plan === 'anual' || plan === 'mensual') savePlan(plan);
  }, [plan]);

  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [profesion, setProfesion] = useState<Profesion | null>(null);
  const [rol, setRol] = useState('');
  const [meta, setMeta] = useState<Meta | null>(null);
  const [timing, setTiming] = useState<Timing | null>(null);
  const [dolores, setDolores] = useState<Dolor[]>([]);
  const [intensidad, setIntensidad] = useState<Intensidad | null>(null);

  const stepId: StepId = STEP_IDS[stepIndex];
  const percent = Math.max(8, ((stepIndex + 1) / STEP_IDS.length) * 100);

  const ir = (delta: 1 | -1) => {
    setDirection(delta);
    setStepIndex((i) => Math.min(STEP_IDS.length - 1, Math.max(0, i + delta)));
  };

  const seleccionarProfesion = (p: Profesion) => {
    setProfesion(p);
    setTimeout(() => ir(1), 300);
  };
  const seleccionarMeta = (m: Meta) => {
    setMeta(m);
    setTimeout(() => ir(1), 300);
  };
  const seleccionarTiming = (t: Timing) => {
    setTiming(t);
    setTimeout(() => ir(1), 300);
  };
  const toggleDolor = (d: Dolor) => {
    setDolores((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  };
  const seleccionarIntensidad = (i: Intensidad) => {
    setIntensidad(i);
    setTimeout(() => ir(1), 300);
  };

  const rolFinal = rol.trim() || (profesion ? SUGERENCIAS_ROL[profesion][0] : 'tu rol');

  const puedeVerAtras = stepIndex >= 1 && stepId !== 'loading' && stepId !== 'demo-grabando' && stepId !== 'resultado';

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col px-4 [font-family:var(--font-body)] text-[var(--text-primary)]">
      <FunnelHeader appName="SpeakFast" onBack={puedeVerAtras ? () => ir(-1) : undefined} />
      <div className="pt-2">
        <ProgressBar percent={percent} />
      </div>

      <div className="flex flex-1 flex-col pt-8 pb-10">
        <StepFrame stepKey={stepId} direction={direction}>
          {stepId === 'profesion' && (
            <div className="flex flex-1 flex-col justify-center gap-6">
              <div>
                <h1 className="text-balance text-[28px] font-bold leading-[1.15] [font-family:var(--font-display)]">
                  ¿Cuál es tu <span className="text-[var(--accent)]">profesión</span>?
                </h1>
                <p className="mt-2 text-[14px] text-[var(--text-secondary)]">
                  Así elegimos el banco de preguntas correcto para ti.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {PROFESIONES.map((p) => (
                  <OptionChip
                    key={p.id}
                    label={p.label}
                    icon={p.icon}
                    selected={profesion === p.id}
                    onClick={() => seleccionarProfesion(p.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {stepId === 'rol' && (
            <div className="flex flex-1 flex-col justify-center gap-6">
              <div>
                <h1 className="text-balance text-[28px] font-bold leading-[1.15] [font-family:var(--font-display)]">
                  ¿Cuál es tu <span className="text-[var(--accent)]">rol exacto</span>?
                </h1>
                <p className="mt-2 text-[14px] text-[var(--text-secondary)]">
                  Elige una sugerencia para completar el campo, o escribe el tuyo.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {(profesion ? SUGERENCIAS_ROL[profesion] : SUGERENCIAS_ROL.otra).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRol(s)}
                    className="rounded-full border border-[color-mix(in_oklab,var(--accent)_35%,transparent)] bg-[var(--chip-bg)] px-3 py-1.5 text-[13px] font-medium text-[var(--accent)] [touch-action:manipulation]"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (rol.trim()) ir(1);
                }}
                className="flex flex-col gap-6"
              >
                <input
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                  placeholder="Ej: Frontend Developer"
                  autoFocus
                  className="h-14 w-full rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] bg-[var(--surface)] px-4 text-[16px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
                />
                <StepCta onClick={() => ir(1)} disabled={!rol.trim()}>
                  Continuar
                </StepCta>
              </form>
            </div>
          )}

          {stepId === 'meta' && (
            <div className="flex flex-1 flex-col justify-center gap-6">
              <div>
                <h1 className="text-balance text-[28px] font-bold leading-[1.15] [font-family:var(--font-display)]">
                  ¿A qué <span className="text-[var(--accent)]">sueldo mensual</span> quieres llegar?
                </h1>
                <p className="mt-2 text-[14px] text-[var(--text-secondary)]">
                  Así medimos qué tan cerca estás de tu meta.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {META_OPTIONS.map((m) => (
                  <OptionChip
                    key={m.id}
                    label={m.label}
                    selected={meta === m.id}
                    onClick={() => seleccionarMeta(m.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {stepId === 'timing' && (
            <div className="flex flex-1 flex-col justify-center gap-6">
              <div>
                <h1 className="text-balance text-[28px] font-bold leading-[1.15] [font-family:var(--font-display)]">
                  ¿Para cuándo es tu <span className="text-[var(--accent)]">entrevista</span>?
                </h1>
              </div>
              <div className="flex flex-col gap-3">
                {TIMING_OPTIONS.map((t) => (
                  <OptionChip
                    key={t.id}
                    label={t.label}
                    selected={timing === t.id}
                    onClick={() => seleccionarTiming(t.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {stepId === 'reconocimiento' && (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
              <span
                aria-hidden="true"
                className="flex size-16 items-center justify-center rounded-full bg-[var(--chip-bg)]"
              >
                <Briefcase size={28} color="var(--accent)" aria-hidden="true" />
              </span>
              <h1 className="text-balance text-[26px] font-bold leading-[1.2] [font-family:var(--font-display)]">
                Entendido, <span className="text-[var(--accent)]">{rolFinal}</span>
              </h1>
              <p className="max-w-[38ch] text-[16px] leading-relaxed text-[var(--text-secondary)]">
                {reconocimientoTexto(rolFinal, timing)}
              </p>
              <div className="mt-2 w-full">
                <StepCta onClick={() => ir(1)}>Continuar</StepCta>
              </div>
            </div>
          )}

          {stepId === 'dolores' && (
            <div className="flex flex-1 flex-col justify-center gap-6">
              <div>
                <h1 className="text-balance text-[28px] font-bold leading-[1.15] [font-family:var(--font-display)]">
                  ¿Qué te pasa al <span className="text-[var(--accent)]">hablar en inglés</span>?
                </h1>
                <p className="mt-2 text-[14px] text-[var(--text-secondary)]">Elige todas las que apliquen.</p>
              </div>
              <div className="flex flex-col gap-3">
                {DOLORES_OPTIONS.map((d) => (
                  <OptionChip
                    key={d.id}
                    label={d.label}
                    icon={d.icon}
                    multi
                    selected={dolores.includes(d.id)}
                    onClick={() => toggleDolor(d.id)}
                  />
                ))}
              </div>
              <div className="mt-2">
                <StepCta onClick={() => ir(1)} disabled={dolores.length === 0}>
                  Continuar
                </StepCta>
              </div>
            </div>
          )}

          {stepId === 'intensidad' && (
            <div className="flex flex-1 flex-col justify-center gap-6">
              <div>
                <h1 className="text-balance text-[28px] font-bold leading-[1.15] [font-family:var(--font-display)]">
                  ¿Con qué <span className="text-[var(--accent)]">ritmo</span> quieres entrenar?
                </h1>
                <p className="mt-2 text-[14px] text-[var(--text-secondary)]">Puedes cambiarlo cuando quieras.</p>
              </div>
              <div className="flex flex-col gap-3">
                {INTENSIDAD_OPTIONS.map((i) => (
                  <OptionChip
                    key={i.id}
                    label={`${i.label} — ${i.detalle}`}
                    selected={intensidad === i.id}
                    onClick={() => seleccionarIntensidad(i.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {stepId === 'demo-intro' && (
            <div className="flex flex-1 flex-col justify-center gap-6">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
                  Tu primera práctica
                </p>
                <h1 className="mt-2 text-balance text-[26px] font-bold leading-[1.2] [font-family:var(--font-display)]">
                  Una pregunta de muestra, <span className="text-[var(--accent)]">60 segundos</span>
                </h1>
                <p className="mt-2 text-[14px] text-[var(--text-secondary)]">
                  En la app completa, una voz te hace la entrevista entera y sales con tu chuleta. Esto es solo el primer sabor.
                </p>
              </div>
              <div className="rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_22%,transparent)] bg-[var(--surface)] p-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
                  Tu pregunta
                </p>
                <p className="mt-2 text-[17px] font-semibold leading-snug">&ldquo;{DEMO_QUESTION}&rdquo;</p>
              </div>
              <p className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--text-secondary)]">
                <Lock size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                Nadie más te escucha: tu voz se convierte a texto y se borra al instante.
              </p>
              <StepCta onClick={() => ir(1)}>Empezar mi práctica</StepCta>
            </div>
          )}

          {stepId === 'demo-grabando' && (
            <DemoGrabando onDone={() => ir(1)} />
          )}

          {stepId === 'loading' && <LoadingPlan onDone={() => ir(1)} />}

          {stepId === 'resultado' && (
            <ResultadoDemo
              rol={rolFinal}
              dolores={dolores}
              onContinuar={() => {
                saveOnboarding({
                  profesion,
                  rol: rolFinal,
                  meta,
                  timing,
                  dolores,
                  intensidad,
                  indicePreparacion: calcularIndicePartida(intensidad, dolores),
                });
                router.push('/paywall');
              }}
            />
          )}
        </StepFrame>
      </div>
    </main>
  );
}

function DemoGrabando({ onDone }: { onDone: () => void }) {
  const [activo] = useState(true);
  const restante = useCountdown(60, activo, onDone);
  const minutos = Math.floor(restante / 60);
  const segundos = restante % 60;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
      <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">Grabando</p>
      {/* Grabando = urgencia/calidez (2ª nota terracota), no "progreso" (eso es
          el verde) — 3er punto real de identidad en vivo del flujo. */}
      <div className="relative flex size-28 items-center justify-center">
        <span className="absolute inset-0 animate-pulse rounded-full bg-[color-mix(in_oklab,var(--accent-2)_14%,transparent)]" />
        <span className="flex size-20 items-center justify-center rounded-full bg-[var(--accent-2)]">
          <Mic size={30} color="var(--bg)" aria-hidden="true" />
        </span>
      </div>
      <p className="text-[32px] font-bold tabular-nums [font-family:var(--font-display)]">
        {minutos}:{String(segundos).padStart(2, '0')}
      </p>
      <p className="max-w-[32ch] text-[15px] text-[var(--text-secondary)]">
        Responde la pregunta en voz alta. Puedes terminar antes si ya respondiste.
      </p>
      <button
        type="button"
        onClick={onDone}
        className="flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] px-5 py-3 text-[14px] font-semibold text-[var(--text-primary)] [touch-action:manipulation]"
      >
        <Square size={14} aria-hidden="true" /> Ya respondí
      </button>
    </div>
  );
}

function LoadingPlan({ onDone }: { onDone: () => void }) {
  const lineas = [
    'Transcribiendo tu respuesta',
    'Detectando tus muletillas',
    'Calculando tu fluidez',
    'Armando tu Índice de Preparación',
  ];
  const [completadas, setCompletadas] = useState(0);

  useEffect(() => {
    if (completadas >= lineas.length) {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCompletadas((c) => c + 1), 1100);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completadas]);

  const percent = (completadas / lineas.length) * 100;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10">
      <RingProgress percent={percent} />
      <h1 className="text-[22px] font-bold [font-family:var(--font-display)]">Construyendo tu plan…</h1>
      <div className="flex w-full flex-col gap-4" aria-live="polite" aria-busy={completadas < lineas.length}>
        {lineas.map((texto, i) => (
          <LineaAnalisis
            key={texto}
            texto={texto}
            estado={i < completadas ? 'completada' : i === completadas ? 'activa' : 'pendiente'}
          />
        ))}
      </div>
    </div>
  );
}

function ResultadoDemo({
  rol,
  dolores,
  onContinuar,
}: {
  rol: string;
  dolores: Dolor[];
  onContinuar: () => void;
}) {
  const muletilla = dolores.includes('muletillas') ? "usaste 'ehm' 5 veces" : "usaste 'ehm' 2 veces";
  return (
    <div className="flex flex-1 flex-col justify-center gap-6">
      <div className="text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
          Tu punto de partida
        </p>
        {/* Recuadro del dato héroe con filo de terracota (FICHA-ARTE: el ÚNICO uso
            permitido de --accent-2 fuera del chip de ícono) + conteo animado real
            (nunca un número congelado — baseline de movimiento no negociable). */}
        <div
          className="mx-auto mt-3 inline-flex flex-col items-center rounded-[var(--radius-card)] border-[1.5px] px-8 py-4"
          style={{ borderColor: 'color-mix(in oklab, var(--accent-2) 55%, transparent)' }}
        >
          <p className="text-[56px] font-bold leading-none tabular-nums [font-family:var(--font-display)]">
            <CountUpNumber to={34} duration={0.9} />
            <span className="text-[24px] text-[var(--text-secondary)]">/100</span>
          </p>
          <p className="mt-1 text-[14px] text-[var(--text-secondary)]">de Índice de Preparación</p>
        </div>
      </div>

      <div className="rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_22%,transparent)] bg-[var(--surface)] p-5">
        <ul className="flex flex-col gap-3">
          <li className="flex items-start gap-3 text-[15px]">
            <CheckCustom />
            <span>
              Fluidez: <CountUpNumber to={58} duration={0.8} />
              /100 en tu primera respuesta como {rol}
            </span>
          </li>
          <li className="flex items-start gap-3 text-[15px]">
            <CheckCustom />
            <span>Pausa por traducción: 3.8s (alta)</span>
          </li>
          <li className="flex items-start gap-3 text-[15px]">
            <CheckCustom />
            <span>Muletillas detectadas: {muletilla}</span>
          </li>
          <li className="flex items-start gap-3 text-[15px]">
            <CheckCustom />
            <span>Con 7 días de entrenamiento puedes llegar a ~80%</span>
          </li>
        </ul>
      </div>

      {/* Primer vistazo de la "chuleta": una frase mejorada real de la pregunta de
          práctica. En la app completa, cada entrevista deja la chuleta entera
          (frases anti-bloqueo + upgrades de vocabulario). */}
      <div className="rounded-[var(--radius-card)] bg-[color-mix(in_oklab,var(--accent)_6%,transparent)] p-5">
        <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
          Un vistazo a tu chuleta
        </p>
        <p className="mt-2 text-[14px] text-[var(--text-secondary)] line-through decoration-[color-mix(in_oklab,var(--text-tertiary)_50%,transparent)]">
          &ldquo;I made a website for the challenge.&rdquo;
        </p>
        <p className="mt-1 text-[15px] font-semibold text-[var(--text-primary)]">
          &ldquo;I architected a scalable web application for that challenge.&rdquo;
        </p>
      </div>

      <StepCta onClick={onContinuar} alto={56}>
        Ver mi plan completo
      </StepCta>
    </div>
  );
}
