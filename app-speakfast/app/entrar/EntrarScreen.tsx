'use client';

// LOGIN — el último paso del funnel (blueprint: 50-DISENO-ONBOARDING-PAYWALL.md §E).
// Sin contraseña: magic link por email (decisión de 26-AUTH-MODERNO.md, ver
// ESTADO.md → Decisiones técnicas → Auth). El envío real via Supabase se conecta
// en la Sesión 6 — aquí se simula el estado local (mismo criterio que el paywall)
// para que la pantalla completa (los 3 estados) quede construida y revisada ya.

import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail } from 'lucide-react';
import { StepCta } from '@/components/onboarding/ui';

type Estado = 'idle' | 'enviando' | 'enviado' | 'error';

export function EntrarScreen() {
  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState<Estado>('idle');
  const [reenviarEn, setReenviarEn] = useState(0);

  const emailValido = /\S+@\S+\.\S+/.test(email);

  const enviar = (e?: FormEvent) => {
    e?.preventDefault();
    if (!emailValido || estado === 'enviando') return;
    setEstado('enviando');
    // Simulación local (Sesión 6 conecta Supabase Auth de verdad).
    setTimeout(() => {
      setEstado('enviado');
      setReenviarEn(60);
      const id = setInterval(() => {
        setReenviarEn((s) => {
          if (s <= 1) {
            clearInterval(id);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }, 900);
  };

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col px-4 [font-family:var(--font-body)] text-[var(--text-primary)]">
      <div className="flex h-14 items-center">
        <a href="/" className="flex items-center gap-2 text-[15px] font-semibold">
          <span aria-hidden="true" className="size-5 rounded-[var(--radius-button)] bg-[var(--accent)]" />
          SpeakFast
        </a>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        className="flex flex-1 flex-col justify-center gap-6 pb-16"
      >
        {estado === 'enviado' ? (
          <motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <span aria-hidden="true" className="flex size-16 items-center justify-center rounded-full bg-[var(--chip-bg)]">
              <Mail size={28} color="var(--accent)" aria-hidden="true" />
            </span>
            <h1 className="text-balance text-[24px] font-bold leading-tight [font-family:var(--font-display)]">
              Revisa tu correo
            </h1>
            <p className="max-w-[36ch] text-[15px] leading-relaxed text-[var(--text-secondary)]">
              Te enviamos el enlace de acceso a <strong>{email}</strong>.
            </p>
            <button
              type="button"
              disabled={reenviarEn > 0}
              onClick={() => enviar()}
              className={`text-[14px] font-semibold [touch-action:manipulation] ${
                reenviarEn > 0 ? 'text-[var(--text-tertiary)]' : 'text-[var(--accent)] underline underline-offset-4'
              }`}
            >
              {reenviarEn > 0 ? `Reenviar en ${reenviarEn}s` : 'Reenviar enlace'}
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
              <h1 className="text-balance text-[26px] font-bold leading-[1.2] [font-family:var(--font-display)]">
                Entra a tu plan
              </h1>
              <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)]">
                Para guardarlo y verlo en cualquier dispositivo. Si ya compraste, usa el correo de tu
                compra en Hotmart.
              </p>
            </motion.div>

            <motion.form
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              onSubmit={enviar}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                autoFocus
                autoComplete="email"
                className="h-14 w-full rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] bg-[var(--surface)] px-4 text-[16px] outline-none focus:border-[var(--accent)]"
              />
              <StepCta onClick={() => enviar()} disabled={!emailValido || estado === 'enviando'}>
                {estado === 'enviando' ? 'Enviando…' : 'Enviarme mi enlace de acceso'}
              </StepCta>
            </motion.form>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="flex items-center justify-center gap-1.5 text-center text-[13px] text-[var(--text-tertiary)]"
            >
              <Lock size={13} aria-hidden="true" />
              Sin contraseñas: te llegará un enlace de un solo uso
            </motion.p>
          </>
        )}
      </motion.div>
    </main>
  );
}
