'use client';

// Al entrar a la app por primera vez, sube a la cuenta lo que respondiste en el
// onboarding anónimo (localStorage) y luego lo limpia. Silencioso: si falla,
// se reintenta la próxima vez. Se monta una sola vez en el layout de /app.

import { useEffect, useRef } from 'react';
import { readOnboarding, marcarMigrado, yaMigrado } from '@/lib/onboarding-storage';

export function OnboardingSync() {
  const corriendo = useRef(false);

  useEffect(() => {
    if (corriendo.current || yaMigrado()) return;
    const datos = readOnboarding();
    if (!datos) return;
    corriendo.current = true;

    fetch('/api/onboarding/migrate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(datos),
    })
      .then((r) => {
        if (r.ok) marcarMigrado();
      })
      .catch(() => {
        /* sin conexión: se reintenta en la próxima carga */
      })
      .finally(() => {
        corriendo.current = false;
      });
  }, []);

  return null;
}
