# VEREDICTO revisor-visual — paywall
Fecha: 2026-09-05 16:00
Screenshot: qa-s4/09-paywall-top-v2.png
Usabilidad: 31/40  (h1:3 h2:4 h3:3 h4:4 h5:3 h6:3 h7:3 h8:3 h9:2 h10:3)
Craft: 14/20  (jerarquía:4 profundidad:2 identidad:3 movimiento:2 encaje:3)
Copy (si vende): 17/20  (idea:3 especificidad:3 emoción:3 oferta:4 acción:4)
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

## Verificación de los 5 defectos de la pasada anterior
1. Contraste global → mismo fix que onboarding (--text-secondary/--text-tertiary), verificado a mano (≥4.5:1 en ambos fondos). RESUELTO.
2. Hairline degradé en la card del timeline → confirmado: `<Hairline surface="surface" className="p-5">` (PaywallScreen.tsx línea 102) envuelve el `<ol>` del timeline; `Hairline` (components/landing/ui.tsx línea 95) es un borde-degradé real (`linear-gradient` en border-box), no un borde plano disfrazado. Visible en 09-paywall-top-v2.png. RESUELTO.
3. CountUpNumber en "34%" del Índice de Preparación → confirmado (línea 90). RESUELTO.
4. Nodo "Día 7" sólido en --accent-2 → confirmado (línea 128-132, `backgroundColor: var(--accent-2)`, mismo tamaño `size-3` que los nodos verdes anteriores). Visible en la captura. RESUELTO.
5. `onClose` → `router.back()` → confirmado en código (línea 64, 75). "Ahora no" → `router.push('/')` (línea 65, 205), distinto y deliberado. RESUELTO EN CÓDIGO, con una reserva (ver defecto #1 abajo): depende de que Next.js conserve el estado de `OnboardingFlow` (useState local, no persistido en URL) al volver — si el router remonta la ruta, el usuario vuelve al paso 1, no al resultado.

Los 5 quedaron resueltos (el #5 con una reserva de robustez). No sube a 36/40 · 16/20 · 16/20 por otros problemas encontrados en esta pasada de ojos frescos.

## TOP DEFECTOS
1. [Header — botón X / cerrarAlResultado, línea 64] `router.back()` asume que el paso del onboarding sobrevive a la navegación; como `OnboardingFlow` guarda el paso en `useState` sin reflejarlo en la URL, si Next.js remonta la ruta al volver, el usuario cae en "¿Cuál es tu profesión?" (paso 1) en vez de en el resultado — pierde la sensación de "no perdiste tu progreso" que el fix prometía → persistir el paso en un searchParam o en sessionStorage y leerlo al montar.
2. [Todo el bloque animado de la pantalla, línea 77-217] El `motion.div` con `staggerChildren` no usa `useReducedMotion` (a diferencia de `StepFrame`/`RingProgress`/`ProgressBar` en components/onboarding/ui.tsx, que sí lo hacen) → un usuario con "reducir movimiento" activado en el sistema igual ve el stagger completo en la pantalla que más dinero cobra → envolver en `MotionConfig reducedMotion="user"` o condicionar los `variants`.
3. [Card del timeline y cards de plan] Ningún elemento tiene sombra de elevación (`--shadow-1`/`--shadow-2` sin usar, igual que en onboarding) → la profundidad se apoya solo en color+borde, se siente plana comparada con lo que promete la Ficha de Arte ("sombras suaves tintadas... no bordes duros"). → aplicar shadow a la card seleccionada/timeline.
4. [Toda la pantalla] Sin estado de error para `empezarTrial` (hoy siempre "funciona" porque es un `setTimeout` simulado) → antes de conectar el checkout real de Hotmart (Sesión 6) falta diseñar qué se ve si el redirect/API falla.
5. [Badge "MÁS POPULAR", línea 181] Texto `var(--bg)` sobre fondo `var(--accent)` mide ≈4.47:1 (recalculado a mano) — por debajo de 4.5:1 AA para texto de 10px en negrita (no califica como "texto grande") → aclarar un punto el `--bg` del badge o invertir a `--text-primary` sobre un fondo más claro.
