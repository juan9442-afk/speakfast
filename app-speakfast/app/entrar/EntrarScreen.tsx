'use client';

// LOGIN — el último paso del funnel (blueprint: 50-DISENO-ONBOARDING-PAYWALL.md §E).
// Sin contraseña: el usuario recibe UN correo con enlace + código de 6 dígitos
// (26-AUTH-MODERNO.md: siempre ambos — el enlace puede abrirse en otro navegador,
// el código se escribe donde empezó). Conectado a Supabase Auth.

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { KeyRound, Lock, Mail } from 'lucide-react';
import { Logo } from '@/components/brand';
import { StepCta } from '@/components/onboarding/ui';
import { createClient } from '@/lib/supabase/client';

type Estado = 'idle' | 'enviando' | 'enviado' | 'error';

export function EntrarScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [estado, setEstado] = useState<Estado>('idle');
  const [error, setError] = useState<string | null>(null);
  const [verificando, setVerificando] = useState(false);
  const [reenviarEn, setReenviarEn] = useState(0);

  const emailValido = /\S+@\S+\.\S+/.test(email);
  const codigoValido = /^\d{6}$/.test(codigo.trim());

  useEffect(() => {
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('error') === 'enlace') {
      setError('Ese enlace no funcionó (expiró, ya se usó, o lo abriste en otro navegador). Escribe abajo tu correo y usa el código de 6 dígitos del email.');
    }
  }, []);

  const arrancarContador = () => {
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
  };

  const enviar = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!emailValido || estado === 'enviando') return;
    setEstado('enviando');
    setError(null);

    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    });

    if (err) {
      setEstado('error');
      setError('No pudimos enviar el correo. Revisa la dirección e inténtalo de nuevo.');
      return;
    }
    setEstado('enviado');
    arrancarContador();
  };

  const verificarCodigo = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!codigoValido || verificando) return;
    setVerificando(true);
    setError(null);

    const supabase = createClient();
    const { error: err } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: codigo.trim(),
      type: 'email',
    });

    if (err) {
      setVerificando(false);
      setError('Ese código no es correcto o ya venció. Revisa el último correo.');
      return;
    }
    router.push('/app');
  };

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col px-4 [font-family:var(--font-body)] text-[var(--text-primary)]">
      <div className="flex h-14 items-center">
        <a href="/" aria-label="Ir al inicio">
          <Logo size={22} textClass="text-[16px]" />
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
              Te enviamos el enlace de acceso a <strong>{email}</strong>. Ábrelo desde este
              dispositivo, o escribe aquí el código de 6 dígitos del correo.
            </p>

            <form onSubmit={verificarCodigo} className="flex w-full flex-col gap-3">
              <label className="sr-only" htmlFor="codigo">Código de 6 dígitos</label>
              <div className="relative">
                <KeyRound
                  size={16}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
                />
                <input
                  id="codigo"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={codigo}
                  onChange={(ev) => setCodigo(ev.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className="h-14 w-full rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] bg-[var(--surface)] pl-11 pr-4 text-[18px] tracking-[0.3em] tabular-nums outline-none focus:border-[var(--accent)]"
                />
              </div>
              <StepCta onClick={() => verificarCodigo()} disabled={!codigoValido || verificando}>
                {verificando ? 'Comprobando…' : 'Entrar'}
              </StepCta>
            </form>

            {error && (
              <p role="alert" className="text-[13px] text-[var(--error)]">
                {error}
              </p>
            )}

            <button
              type="button"
              disabled={reenviarEn > 0}
              onClick={() => enviar()}
              className={`text-[14px] font-semibold [touch-action:manipulation] ${
                reenviarEn > 0 ? 'text-[var(--text-tertiary)]' : 'text-[var(--accent)] underline underline-offset-4'
              }`}
            >
              {reenviarEn > 0 ? `Reenviar en ${reenviarEn}s` : 'Reenviar correo'}
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

            {error && (
              <motion.p
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                role="alert"
                className="text-[13px] text-[var(--error)]"
              >
                {error}
              </motion.p>
            )}

            <motion.p
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="flex items-center justify-center gap-1.5 text-center text-[13px] text-[var(--text-tertiary)]"
            >
              <Lock size={13} aria-hidden="true" />
              Sin contraseñas: te llega un enlace y un código de un solo uso
            </motion.p>
          </>
        )}
      </motion.div>
    </main>
  );
}
