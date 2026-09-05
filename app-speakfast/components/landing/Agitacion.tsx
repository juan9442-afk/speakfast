'use client';

// KIT DE LANDING — §3 AGITACIÓN (blueprint: 55 §3)
// El costo de seguir igual, visible. El tipo de `frases` es string[] a propósito:
// es IMPOSIBLE pasarle un párrafo de 72 palabras — cada frase es corta (máx 2
// líneas; warn a las 18 palabras). El NÚMERO del costo va en [b]/[acento] desde
// el copy marcado (es el dato héroe de la sección). MISMO fondo elevado que §2
// (un solo movimiento visual, sin separador). Cero decoración de miedo.

import { motion } from 'motion/react';
import { SectionShell, useReveal, VIEWPORT_ONCE } from './ui';
import { MarkedCopy, warnCopy, warnRango } from './MarkedCopy';

export interface AgitacionProps {
  /** 2-4 frases MARCADAS y cortas — el array es el contrato: nada de párrafos. */
  frases: string[];
  /** Mini-card opcional "hoy vs en 6 meses" (55 §3). */
  contraste?: {
    labelHoy: string;
    hoy: string;
    labelFuturo: string;
    futuro: string;
  };
  id?: string;
}

export function Agitacion({ frases, contraste, id }: AgitacionProps) {
  warnRango('Agitación → frases', frases.length, 2, 4);
  frases.forEach((f, i) => warnCopy(`Agitación → frase ${i + 1}`, f, 18));
  const { contenedor, item } = useReveal();

  return (
    <SectionShell id={id} elevacion="elevada" flush="top" ariaLabel="El costo de seguir igual">
      <motion.div
        variants={contenedor}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="mx-auto max-w-[620px]"
      >
        <div className="flex flex-col gap-4">
          {frases.map((f, i) => {
            // La última frase es el pico de la agitación (55 §3): más peso
            // visual que las anteriores, no la misma jerarquía plana.
            const esUltima = i === frases.length - 1;
            return (
              <motion.p
                key={i}
                variants={item}
                className={
                  esUltima
                    ? 'text-[19px] font-semibold leading-[1.5] text-[var(--text-primary)]'
                    : 'text-[17px] leading-[1.6] text-[var(--text-secondary)]'
                }
              >
                <MarkedCopy text={f} />
              </motion.p>
            );
          })}
        </div>

        {contraste && (
          <motion.div variants={item} className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Nivel "hundido" (3er nivel de profundidad de FICHA-ARTE): sombra
                INSET, no la shadow-1 elevada del resto de las cards — un bloque
                recesado se lee con borde + sombra hacia adentro, no hacia afuera. */}
            <div className="rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_20%,transparent)] bg-[var(--bg)] p-5 shadow-[inset_0_1px_4px_rgb(46_34_22_/_0.10)]">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                {contraste.labelHoy}
              </p>
              <p className="mt-2 text-[15px] leading-snug text-[var(--text-primary)]">{contraste.hoy}</p>
            </div>
            {/* "si nada cambia": más apagado/frío — el peso lo pone el copy, no el rojo */}
            <div className="rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_20%,transparent)] bg-[var(--surface-2)] p-5 shadow-[inset_0_1px_4px_rgb(46_34_22_/_0.10)]">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                {contraste.labelFuturo}
              </p>
              <p className="mt-2 text-[15px] leading-snug text-[var(--text-secondary)]">{contraste.futuro}</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </SectionShell>
  );
}
