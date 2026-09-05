'use client';

// PRACTICAR — la pantalla más vista de la app (ritual M0, ver 56). Muestra el
// Índice de Preparación, la racha, la meta de hoy y EL botón de arranque de la
// entrevista. Datos de ejemplo (mock-app-data) hasta la Sesión 6.

import { motion } from 'motion/react';
import { Flame } from 'lucide-react';
import { AppScreen, BotonAccion, IndiceRing, StatCard } from '@/components/app/ui';
import {
  INDICE_PREPARACION,
  MULETILLAS_SEMANA,
  META_HOY_HECHA,
  PERFIL,
  RACHA_DIAS,
} from '@/lib/mock-app-data';

const META_TEXTO: Record<string, string> = {
  Ligero: '1 pregunta',
  Estándar: '1 entrevista (5 preguntas)',
  Intensivo: '2 entrevistas',
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } } };

export default function PracticarScreen() {
  const limiteAlcanzado = PERFIL.entrevistasHoy >= PERFIL.entrevistasLimiteHoy;

  return (
    <AppScreen>
      <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-4">
        <motion.header variants={item} className="flex items-center justify-between">
          <div>
            <p className="text-[13px] text-[var(--text-secondary)]">Tu entrenamiento</p>
            <p className="text-[20px] font-semibold leading-tight text-[var(--text-primary)]">{PERFIL.rol}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[color-mix(in_oklab,var(--accent-2)_12%,transparent)] px-3 py-1.5 text-[13px] font-bold text-[var(--accent-2)]">
            <Flame size={15} aria-hidden="true" />
            {RACHA_DIAS} días
          </span>
        </motion.header>

        {/* Recuadro del dato héroe con FILO DE TERRACOTA (dispositivo ownable de FICHA-ARTE). */}
        <motion.section
          variants={item}
          className="rounded-[var(--radius-card)] border-2 bg-[var(--surface)] p-6 text-center shadow-[var(--shadow-1)]"
          style={{ borderColor: 'color-mix(in oklab, var(--accent-2) 45%, transparent)' }}
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
            Índice de Preparación
          </p>
          <div className="mt-4">
            <IndiceRing percent={INDICE_PREPARACION} />
          </div>
          <p className="mt-4 text-[14px] text-[var(--text-secondary)]">
            Practica hoy para subir a <span className="font-semibold text-[var(--text-primary)]">~48%</span> esta semana.
          </p>
        </motion.section>

        <motion.section
          variants={item}
          className="rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent)_25%,transparent)] bg-[color-mix(in_oklab,var(--accent)_6%,transparent)] p-5"
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--accent)]">Tu meta de hoy</p>
          <p className="mt-1 text-[16px] font-semibold">
            {limiteAlcanzado
              ? 'Ya hiciste tus 3 entrevistas de hoy'
              : META_HOY_HECHA
                ? '✓ Meta cumplida'
                : META_TEXTO[PERFIL.ritmo]}
          </p>
          <div className="mt-4">
            {limiteAlcanzado ? (
              <BotonAccion disabled alto={56}>
                Vuelve mañana
              </BotonAccion>
            ) : (
              <BotonAccion href="/app/entrevista" alto={56}>
                {META_HOY_HECHA ? 'Hacer otra entrevista' : 'Empezar entrevista'}
              </BotonAccion>
            )}
          </div>
        </motion.section>

        <motion.section variants={item} className="grid grid-cols-2 gap-3">
          <StatCard label="Entrevistas hoy" value={`${PERFIL.entrevistasHoy}/${PERFIL.entrevistasLimiteHoy}`} />
          <StatCard
            label="Muletillas · semana"
            value={MULETILLAS_SEMANA.actual}
            delta={`↓ desde ${MULETILLAS_SEMANA.anterior}`}
          />
        </motion.section>
      </motion.div>
    </AppScreen>
  );
}
