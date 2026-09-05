'use client';

// CUENTA — plan, uso del día y ajustes (voz de la entrevista, recordatorios,
// privacidad). El plan real y el cierre de sesión se conectan en la Sesión 6.

import { useState } from 'react';
import { ChevronRight, LogOut } from 'lucide-react';
import Link from 'next/link';
import { AppScreen, ScreenTitle } from '@/components/app/ui';
import { PERFIL } from '@/lib/mock-app-data';

function Toggle({
  label,
  descripcion,
  activoInicial,
}: {
  label: string;
  descripcion: string;
  activoInicial: boolean;
}) {
  const [activo, setActivo] = useState(activoInicial);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={activo}
      onClick={() => setActivo((v) => !v)}
      className="flex w-full items-center justify-between gap-4 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] bg-[var(--surface)] p-4 text-left [touch-action:manipulation]"
    >
      <span>
        <span className="block text-[15px] font-medium">{label}</span>
        <span className="mt-0.5 block text-[13px] text-[var(--text-secondary)]">{descripcion}</span>
      </span>
      <span
        aria-hidden="true"
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 ${
          activo ? 'bg-[var(--accent)]' : 'bg-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)]'
        }`}
      >
        <span
          className={`absolute top-1 size-5 rounded-full bg-[var(--surface)] shadow-sm transition-all duration-200 ${
            activo ? 'left-6' : 'left-1'
          }`}
        />
      </span>
    </button>
  );
}

export default function CuentaScreen() {
  return (
    <AppScreen>
      <ScreenTitle>Cuenta</ScreenTitle>

      <section className="rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent)_25%,transparent)] bg-[color-mix(in_oklab,var(--accent)_6%,transparent)] p-5">
        <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--accent)]">Tu plan</p>
        <p className="mt-1 text-[18px] font-bold [font-family:var(--font-display)]">SpeakFast Pro · {PERFIL.plan}</p>
        <p className="mt-1 text-[13px] text-[var(--text-secondary)]">Se renueva el {PERFIL.renuevaEl}</p>
        <p className="mt-3 text-[13px]">
          Hoy: <span className="font-semibold">{PERFIL.entrevistasHoy} de {PERFIL.entrevistasLimiteHoy}</span> entrevistas
        </p>
      </section>

      <section className="mt-4 flex flex-col gap-3">
        <Toggle
          label="Voz de Sarah en las entrevistas"
          descripcion="Que la entrevistadora lea cada pregunta en voz alta."
          activoInicial={PERFIL.vozActiva}
        />
        <Toggle
          label="Recordatorios por correo"
          descripcion="Un aviso el día que tu entrevista se acerca."
          activoInicial={PERFIL.recordatoriosEmail}
        />
      </section>

      <section className="mt-4 flex flex-col gap-2">
        {[
          { label: 'Privacidad', href: '/privacidad' },
          { label: 'Términos y Condiciones', href: '/terminos' },
          { label: 'Aviso de IA', href: '/aviso-ia' },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="flex items-center justify-between rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_16%,transparent)] bg-[var(--surface)] px-4 py-3 text-[14px] font-medium [touch-action:manipulation]"
          >
            {l.label}
            <ChevronRight size={18} color="var(--text-tertiary)" aria-hidden="true" />
          </Link>
        ))}
      </section>

      <button
        type="button"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_25%,transparent)] py-3 text-[14px] font-semibold text-[var(--text-secondary)] [touch-action:manipulation]"
      >
        <LogOut size={16} aria-hidden="true" />
        Cerrar sesión
      </button>

      <p className="mt-4 text-center text-[12px] text-[var(--text-tertiary)]">
        Tu voz nunca se guarda: se transcribe y se borra al instante.
      </p>
    </AppScreen>
  );
}
