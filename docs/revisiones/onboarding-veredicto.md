# VEREDICTO revisor-visual — onboarding
Fecha: 2026-09-05 16:00
Screenshot: qa-s4/01-profesion-v2.png; qa-s4/07-grabando-v2.png; qa-s4/08-resultado-v2.png
Usabilidad: 29/40  (h1:3 h2:4 h3:3 h4:3 h5:3 h6:3 h7:2 h8:3 h9:2 h10:3)
Craft: 15/20  (jerarquía:4 profundidad:2 identidad:3 movimiento:3 encaje:3)
Copy (si vende): N-A (pantalla de producto, no de venta)
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

## Verificación de los 5 defectos de la pasada anterior
1. Énfasis en h1 (6 títulos con 1-3 palabras en --accent) → CONFIRMADO en código (OnboardingFlow.tsx líneas 147, 171, 206, 231, 246, 277) y en captura 01-profesion-v2.png ("profesión" en verde). RESUELTO.
2. Contraste --text-secondary/--text-tertiary → recalculado a mano: #665F52 vs #F3ECDA = 5.36:1, vs #E7DBBE = 4.60:1; #4A4438 vs ambos ≥7:1. Ambos ≥4.5:1 AA. landing-recheck.png no muestra ninguna ruptura visual del cambio global. RESUELTO.
3. 3 puntos de terracota en vivo → confirmado: mic en DemoGrabando (--accent-2), filo del "34/100" en ResultadoDemo (--accent-2), nodo "Día 7" en PaywallScreen (--accent-2, ver veredicto de paywall). RESUELTO.
4. CountUpNumber en "34/100" y "Fluidez 58/100" → confirmado en código (OnboardingFlow.tsx líneas 419 y 431). RESUELTO.
5. StepCta disabled → `opacity-[0.65]` confirmado en components/onboarding/ui.tsx línea 164 (antes 40%). RESUELTO.

Los 5 quedaron resueltos. No sube a 36/40 · 16/20 porque aparecen otros problemas (algunos preexistentes, no parte del lote de 5) al reevaluar con ojos frescos.

## TOP DEFECTOS
1. [Todo el flujo — OptionChip, card del "34/100", card de checklist] Ningún componente usa las sombras del kit (`--shadow-1`/`--shadow-2` definidas en tokens.css pero nunca referenciadas en onboarding/ui.tsx ni OnboardingFlow.tsx) → la "profundidad de 3 niveles" se queda en 2 (bg/surface) sin elevación real → aplicar `shadow-2` a las cards elevadas.
2. [Todo el flujo] Cero estado de error en código (mic bloqueado, fallo al "construir tu plan", sessionStorage no disponible se traga el error en silencio) → antes de conectar STT real (Sesión 6) falta al menos un estado de error con mensaje + qué hacer.
3. [Paso "rol" — input de texto, línea 189-195] El `<input>` no está en un `<form>` ni tiene `onKeyDown`; escribir el rol y presionar Enter no hace nada → agregar submit por Enter.
4. [Header, todo el flujo] Ningún paso ofrece una salida completa del onboarding (solo `onBack` paso a paso; `onClose` nunca se pasa) → un usuario que quiere abandonar el funnel debe cerrar la pestaña → agregar salida real (con o sin confirmación).
5. [Paso "rol" — chips de sugerencia, línea 183] Usan `rounded-full` mientras `OptionChip` (mismo paso, mismo tipo de control tocable) usa `var(--radius-button)` (13px) → dos radios distintos para el mismo rol de componente → unificar.
