'use client';

// PAYWALL — la pantalla que cobra (blueprint: 50-DISENO-ONBOARDING-PAYWALL.md §C).
// Modelo 2 (ESTADO.md): llega DESPUÉS de la demo del onboarding, con el Índice de
// Preparación y el rol ya conocidos. Timeline del trial (C4, el default cuando hay
// trial) en vez de una lista de features. El checkout real de Hotmart se conecta
// en la Sesión 6 (SECUENCIA-MAESTRA-CONSTRUCCION.md) — el CTA de aquí SIMULA el
// paso siguiente con estado local (C3ter: nunca un checkout falso que parezca
// procesar un cobro real).

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Check, Lock, ShieldCheck } from 'lucide-react';
import { CheckCustom, CountUpNumber, Hairline } from '@/components/landing/ui';
import { FunnelHeader, StepCta } from '@/components/onboarding/ui';
import { readOnboarding, readPlan } from '@/lib/onboarding-storage';

type PlanId = 'anual' | 'mensual';

const PLANES: Record<
  PlanId,
  { nombre: string; precioMes: string; sufijo: string; detalle: string; badge?: string }
> = {
  anual: {
    nombre: 'Anual',
    precioMes: '$3.75',
    sufijo: '/mes',
    detalle: 'Se cobra $44.99/año · ahorras 37%',
    badge: 'MÁS POPULAR',
  },
  mensual: {
    nombre: 'Mensual',
    precioMes: '$5.99',
    sufijo: '/mes',
    detalle: 'Se cobra $5.99/mes',
  },
};

export function PaywallScreen() {
  const router = useRouter();
  const [plan, setPlan] = useState<PlanId>('anual');
  const [rol, setRol] = useState('tu próxima entrevista');
  const [indice, setIndice] = useState(34);
  const [ritmo, setRitmo] = useState<string | null>(null);
  const [procesando, setProcesando] = useState(false);

  const RITMO_LABEL: Record<string, string> = {
    ligero: 'Ligero (1 pregunta al día)',
    estandar: 'Estándar (1 simulación al día)',
    intensivo: 'Intensivo (2 simulaciones al día)',
  };

  useEffect(() => {
    const guardado = readPlan();
    if (guardado === 'anual' || guardado === 'mensual') setPlan(guardado);
    const datos = readOnboarding();
    if (datos) {
      if (datos.rol) setRol(datos.rol);
      if (typeof datos.indicePreparacion === 'number') setIndice(datos.indicePreparacion);
      if (datos.intensidad) setRitmo(datos.intensidad);
    }
  }, []);

  // X = cierre rápido, vuelve al resultado del onboarding (no tira toda la
  // inversión del flujo de un tirón). "Ahora no" = salida real y deliberada
  // a la versión limitada — sin culpa, sin confirmshaming (50 C2/C5).
  const cerrarAlResultado = () => router.back();
  const salirDelTodo = () => router.push('/');

  const empezarTrial = () => {
    setProcesando(true);
    // Simulación local (C3ter) — Hotmart real se conecta en la Sesión 6.
    setTimeout(() => router.push('/entrar'), 700);
  };

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col px-4 pb-8 [font-family:var(--font-body)] text-[var(--text-primary)]">
      <FunnelHeader appName="SpeakFast" onClose={cerrarAlResultado} />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        className="flex flex-1 flex-col gap-6 pt-4"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
          <h1 className="text-balance text-[28px] font-bold leading-[1.15] [font-family:var(--font-display)]">
            Tu <span className="text-[var(--accent)]">Simulacro de Presión</span> para {rol} está listo
          </h1>
          <p className="mt-2 text-[14px] text-[var(--text-secondary)]">
            Tu Índice de Preparación de partida:{' '}
            <strong className="text-[var(--text-primary)]">
              <CountUpNumber to={indice} duration={0.7} />%
            </strong>
          </p>
          <p className="mt-3 text-[15px] italic leading-relaxed text-[var(--text-secondary)]">
            Para que no se te vuelva a poner la mente en blanco en una llamada real.
          </p>
        </motion.div>

        {/* Visual del valor: TIMELINE del trial (C4 — el default cuando hay trial).
            Hairline degradé (gate de detalles premium — 1 de los 1-3 usos permitidos
            por vista): esta es LA card que responde "¿por qué ahora / puedo cancelar?". */}
        <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
        <Hairline surface="surface" className="p-5">
          <ol className="flex flex-col gap-4">
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-1 flex flex-col items-center">
                <span className="size-3 rounded-full bg-[var(--accent)]" />
                <span className="mt-1 h-10 w-[2px] bg-[color-mix(in_oklab,var(--accent)_40%,transparent)]" />
              </span>
              <div>
                <p className="text-[15px] font-semibold">Hoy — acceso completo</p>
                <p className="text-[13px] text-[var(--text-secondary)]">Entrevistas completas de {rol}, sin límites, con tu chuleta cada vez</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-1 flex flex-col items-center">
                <span className="size-3 rounded-full bg-[var(--accent)]" />
                <span className="mt-1 h-10 w-[2px] bg-[color-mix(in_oklab,var(--text-tertiary)_25%,transparent)]" />
              </span>
              <div>
                <p className="text-[15px] font-semibold">Día 6 — te avisamos</p>
                <p className="text-[13px] text-[var(--text-secondary)]">Correo antes de cualquier cobro</p>
              </div>
            </li>
            <li className="flex gap-3">
              {/* Nodo SÓLIDO en terracota — el dato que más importa que el usuario
                  note (la fecha de cobro), con el mismo peso visual que los nodos
                  llenos anteriores (FICHA-ARTE: acento puntual, nunca bloque). */}
              <span
                aria-hidden="true"
                className="mt-1 size-3 rounded-full"
                style={{ backgroundColor: 'var(--accent-2)' }}
              />
              <div>
                <p className="text-[15px] font-semibold">
                  Día 7 — 1er cobro: {PLANES[plan].precioMes}
                  {PLANES[plan].sufijo}
                </p>
                <p className="text-[13px] text-[var(--text-secondary)]">Cancela antes sin costo</p>
              </div>
            </li>
          </ol>
        </Hairline>
        </motion.div>

        <motion.ul
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          className="flex flex-col gap-3"
        >
          <li className="flex items-start gap-3 text-[15px]">
            <CheckCustom />
            <span>Kit de frases anti-bloqueo + tu chuleta, después de cada entrevista</span>
          </li>
          <li className="flex items-start gap-3 text-[15px]">
            <CheckCustom />
            <span>Tu diccionario de &ldquo;sonar profesional&rdquo; que crece contigo</span>
          </li>
          <li className="flex items-start gap-3 text-[15px]">
            <CheckCustom />
            <span>
              {ritmo && RITMO_LABEL[ritmo]
                ? `Tu ritmo elegido: ${RITMO_LABEL[ritmo]}`
                : 'Tu Índice de Preparación actualizado en cada práctica'}
            </span>
          </li>
        </motion.ul>

        {/* Plan cards: Anual pre-seleccionada, tocables */}
        <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col gap-3">
          {(['anual', 'mensual'] as PlanId[]).map((id) => {
            const p = PLANES[id];
            const seleccionado = plan === id;
            return (
              <motion.button
                key={id}
                type="button"
                role="radio"
                aria-checked={seleccionado}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPlan(id)}
                // Borde SIEMPRE de 2px (cambia solo el color) → sin salto de layout al seleccionar.
                className={`relative rounded-[var(--radius-card)] border-2 p-4 pr-11 text-left transition-colors [touch-action:manipulation] ${
                  seleccionado
                    ? 'border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_6%,transparent)]'
                    : 'border-[color-mix(in_oklab,var(--text-tertiary)_28%,transparent)] bg-[var(--surface)]'
                }`}
              >
                {p.badge && (
                  <span className="absolute -top-2.5 left-4 rounded-full bg-[var(--accent)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-[var(--bg)]">
                    {p.badge}
                  </span>
                )}
                {/* Indicador de selección (radio) — no basta el color de borde */}
                <span
                  aria-hidden="true"
                  className={`absolute right-4 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded-full border-2 ${
                    seleccionado
                      ? 'border-[var(--accent)] bg-[var(--accent)]'
                      : 'border-[color-mix(in_oklab,var(--text-tertiary)_35%,transparent)]'
                  }`}
                >
                  {seleccionado && <Check size={12} strokeWidth={3} color="var(--bg)" />}
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-[16px] font-semibold">{p.nombre}</span>
                  <span className="text-[20px] font-bold tabular-nums [font-family:var(--font-display)]">
                    {p.precioMes}
                    <span className="text-[13px] font-normal text-[var(--text-secondary)]">{p.sufijo}</span>
                  </span>
                </div>
                <p className="mt-1 text-[13px] text-[var(--text-secondary)]">{p.detalle}</p>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="mt-2 flex flex-col gap-3">
          <StepCta onClick={empezarTrial} alto={56} disabled={procesando}>
            {procesando ? 'Redirigiendo…' : 'Empezar mis 7 días gratis'}
          </StepCta>
          <p className="text-center text-[13px] text-[var(--text-secondary)]">Cancela cuando quieras</p>
          <button
            type="button"
            onClick={salirDelTodo}
            className="mx-auto flex h-11 items-center px-3 text-[14px] font-medium text-[var(--text-tertiary)] [touch-action:manipulation]"
          >
            Ahora no
          </button>
          <p className="flex items-center justify-center gap-1.5 text-[12px] text-[var(--text-tertiary)]">
            <Lock size={13} aria-hidden="true" />
            Pago seguro con Hotmart
            <ShieldCheck size={13} aria-hidden="true" />
            Garantía de 15 días
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}
