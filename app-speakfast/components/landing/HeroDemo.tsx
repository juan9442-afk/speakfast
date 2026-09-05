'use client';

// DEMO ANIMADA DEL HERO — un "GIF" hecho con SVG + motion (cero archivo de video,
// pesa nada, funciona en Android gama media de LATAM). Loop de ~7s que muestra
// el Simulacro: Sarah pregunta → grabas con cronómetro → sale tu resultado +
// chuleta. reduced-motion → se queda en el frame del resultado, sin animar.
// Es una maqueta HONESTA (19 §5): estilizada, no finge ser una captura real.

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Mic } from 'lucide-react';

type Frame = 'pregunta' | 'grabando' | 'resultado';
const ORDEN: Frame[] = ['pregunta', 'grabando', 'resultado'];
const DUR = { pregunta: 2200, grabando: 2600, resultado: 3200 };

export function HeroDemo() {
  const reduce = useReducedMotion();
  const [frame, setFrame] = useState<Frame>(reduce ? 'resultado' : 'pregunta');

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => {
      setFrame((f) => ORDEN[(ORDEN.indexOf(f) + 1) % ORDEN.length]);
    }, DUR[frame]);
    return () => clearTimeout(t);
  }, [frame, reduce]);

  return (
    <div className="flex flex-col items-center gap-4 bg-[color-mix(in_oklab,var(--accent)_5%,var(--surface))] px-6 py-8">
      <div
        className="relative flex h-[360px] w-[214px] flex-col overflow-hidden rounded-[26px] border-[3px] bg-[var(--bg)] p-4 shadow-[var(--shadow-2)]"
        style={{ borderColor: 'color-mix(in oklab, var(--text-primary) 88%, var(--accent))' }}
        aria-hidden="true"
      >
        {/* barra superior tipo "app" */}
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[var(--accent)]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-[var(--accent-2)]">Sarah · RR. HH.</span>
        </div>

        <div className="relative mt-3 flex-1">
          {/* FRAME 1 — la pregunta */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-center"
            animate={{ opacity: frame === 'pregunta' ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[var(--text-tertiary)]">Pregunta 3 de 5</p>
            <p className="mt-2 text-[14px] font-semibold leading-snug text-[var(--text-primary)] [font-family:var(--font-display)]">
              &ldquo;Tell me about a challenge you faced.&rdquo;
            </p>
            <div className="mt-6 flex justify-center">
              <motion.span
                className="flex size-14 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent-2)_14%,transparent)]"
                animate={frame === 'pregunta' ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                <Mic size={22} color="var(--accent-2)" />
              </motion.span>
            </div>
          </motion.div>

          {/* FRAME 2 — grabando con cronómetro */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            animate={{ opacity: frame === 'grabando' ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative flex size-24 items-center justify-center">
              <svg width="96" height="96" className="-rotate-90">
                <circle cx="48" cy="48" r="42" fill="none" stroke="color-mix(in oklab, var(--accent) 14%, transparent)" strokeWidth="8" />
                <motion.circle
                  cx="48"
                  cy="48"
                  r="42"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 42}
                  animate={{
                    strokeDashoffset:
                      frame === 'grabando' ? [2 * Math.PI * 42, 2 * Math.PI * 42 * 0.15] : 2 * Math.PI * 42,
                  }}
                  transition={{ duration: 2.4, ease: 'linear' }}
                />
              </svg>
              <span className="absolute text-[20px] font-bold tabular-nums text-[var(--text-primary)] [font-family:var(--font-display)]">
                0:47
              </span>
            </div>
            <div className="flex items-end gap-1">
              {[10, 18, 8, 22, 14, 20, 12].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-1 rounded-full bg-[var(--accent)]"
                  style={{ height: h }}
                  animate={frame === 'grabando' ? { scaleY: [1, 0.4, 1.2, 0.7, 1] } : { scaleY: 1 }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.08 }}
                />
              ))}
            </div>
            <p className="text-[11px] text-[var(--text-secondary)]">Respondiendo en voz alta…</p>
          </motion.div>

          {/* FRAME 3 — el resultado + chuleta */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-center"
            animate={{ opacity: frame === 'resultado' ? 1 : 0, y: frame === 'resultado' ? 0 : 12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-[var(--accent)]">Resultado</p>
            <div
              className="mt-1 rounded-[14px] border-2 px-3 py-2"
              style={{ borderColor: 'color-mix(in oklab, var(--accent-2) 45%, transparent)' }}
            >
              <p className="text-[28px] font-bold leading-none tabular-nums text-[var(--text-primary)] [font-family:var(--font-display)]">
                74<span className="text-[13px] text-[var(--text-secondary)]">/100</span>
              </p>
              <p className="text-[10px] text-[var(--text-secondary)]">de fluidez · &ldquo;ehm&rdquo; x2</p>
            </div>
            <div className="mt-2 rounded-[12px] bg-[color-mix(in_oklab,var(--accent-2)_8%,transparent)] px-3 py-2">
              <p className="text-[9px] font-bold uppercase tracking-[0.05em] text-[var(--accent-2)]">Tu chuleta</p>
              <p className="mt-1 text-[11px] leading-snug text-[var(--text-primary)]">
                &ldquo;Let me give you some context first…&rdquo;
              </p>
              <p className="mt-1 text-[10px] text-[var(--text-secondary)]">
                <span className="line-through">I made a thing</span> → <span className="font-semibold">I architected…</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <p className="text-[13px] text-[var(--text-secondary)]">
        Así se ve el <span className="font-semibold text-[var(--text-primary)]">Simulacro de Presión</span> por dentro.
      </p>
    </div>
  );
}
