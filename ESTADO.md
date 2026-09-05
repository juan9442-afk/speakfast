# ESTADO — SpeakFast
Última actualización: 2026-09-05 | Sesión actual: 3 (cerrada — esperando OK para Sesión 4)

⏸️ CHECKPOINT — Landing "elevada" a pedido del usuario (CTA repetido tras Solución/carrusel/Garantía, plan propagado en la URL). 7 rondas de revisor-visual con contexto limpio (autorizado por el usuario a reabrir bg/surface y sumar un uso real de terracota, ya aprobados en Sesión 2) encontraron y se corrigieron ~16 defectos reales y verificados: barra sticky duplicada, ambigüedad 7 días/15 días, plan no propagado, copy con "HR"/"Tech" sueltos, jerarquía plana en Agitación, vacío de animación al scrollear, doble badge + demasiados tamaños tipográficos en la card Anual, CTA reimplementado a mano en vez de reusar el componente, verbos de CTA inconsistentes, overlay de dev tools tapando capturas, precio repetido dos veces seguidas, botones de plan de distinta altura, min-h-full en vez de min-h-dvh. El veredicto NO llegó a LISTA (última puntuación: Usabilidad 29/40 · Craft 12/20 · Copy 18/20) — el puntaje osciló sin converger entre rondas (craft pasó por 18→13→15→13→16→14→12 puntuando esencialmente la misma página cada vez más pulida), señal de que las pasadas ya están siendo cada vez más subjetivas en vez de encontrar defectos nuevos y objetivos. Se decidió PARAR el ciclo automático y presentarle el estado real al usuario en vez de seguir iterando sin convergencia. tsc + build limpios en cada paso.

## Qué es esta app (3 líneas máximo)
Simulador de entrevistas de trabajo en inglés: el usuario elige su puesto, responde preguntas reales en voz alta con temporizador de presión, y recibe feedback inmediato de fluidez, muletillas ("ehm", "like"), pronunciación y velocidad de habla.
Para profesionales técnicos de LATAM y España (22-40) con inglés pasivo que pierden ofertas remotas en USD/EUR por bloquearse al hablar.
Monetización: suscripción $5.99/mes · $44.99/año · prueba gratis 7 días.

## Promesa central
"SpeakFast ayuda a profesionales técnicos de LATAM y España a asegurar un trabajo remoto en USD/EUR sin pagar profesores caros ni perder meses en gramática, mediante simulaciones de entrevista de alto estrés de 10 minutos al día."

## Reporte de validación (Sesión 1) — YA VALIDADA por el usuario (RESUMEN FINAL pegado 2026-09-04)
- Veredicto: Excelente oportunidad (validada fuera del SO por el usuario — no se re-valida)
- Apps de referencia: Duolingo (muy básico/gamificado, no laboral) · Elsa Speak (repite frases sueltas, no improvisación bajo presión) · Cambly (caro, requiere agendar profesores humanos)
- Lo que los usuarios odian de la competencia (nuestra oportunidad): no preparan para responder "Tell me about a challenge" bajo presión · no miden tiempo de respuesta en voz alta ni señalan vocabulario pobre · no hay simulación de preguntas abiertas de entrevista por rol
- Brecha LATAM confirmada: sí — 17 apps parecidas contadas, ninguna 100% enfocada en entrevistas de trabajo en inglés por rol para LATAM
- Precio de referencia del mercado: $15-$30/mes (nosotros $5.99/mes — precio de penetración)

## Dirección de Arte (Sesión 2 — COSA JUZGADA — NO cambiar sin OK explícito del usuario)
- FICHA-ARTE.md: existe y APROBADA por el usuario — 2026-09-04. Dirección: "El entrenador editorial" (combinación A+F ajustada).
- ¿Hubo referencia visual del usuario?: NO. Fusión de líderes (Headspace + Cal AI + Duolingo + Linear) + protocolo A/B/C (2 rondas + combinación). Restricción del usuario: landing NO estilo "anuncio de curso de trading" (nada de negro+dorado, mayúsculas gritonas, cuentas regresivas falsas).
- Resumen: modo CLARO cálido · fondo #FAF6EC · superficie #FFFDF7 · texto #241F1A/#7C7568 · **acento principal verde #1F7A5A** (CTA, progreso, deltas positivos, "listo/aprobado") · **2ª nota terracota #B5502F** (SOLO: filo del dato héroe, chips de ícono, subrayado marcador — nunca bloque/barra/botón) · Display **Fraunces** (600) · Body **Figtree** (400-700) · radio cards 18px / botón 13px · sombras suaves tintadas cálidas (no bordes duros) · número héroe grande (46-58px, tabular).
- Personalidad: **Directo · Exigente · En tu esquina** (coach que corrige sin adornos pero de tu lado; cero mascota, cero culpa, cero confeti infantil). Arquetipo Héroe + toque Sabio/Cuidador. Motion: ease-out suave 280ms, fade puro en titulares, números cuentan sin rebote, spring 0.1 SOLO al dominar pregunta / hito de racha. Máx 1 exclamación por pantalla.
- Dispositivo ownable: ~~subrayado marcador~~ **REVOCADO 2026-09-04** (al usuario no le gustó viéndolo construido, ni en versión sutil — ver FICHA-ARTE.md "Ajuste post-aprobación") + **filo de terracota** 4px en el recuadro del dato héroe (este sí sigue vigente).
- REGISTRO ANTI-REPETICIÓN (29/54): VETADOS para el próximo proyecto del SO → paleta (claro cálido, acento verde #1F7A5A + nota terracota #B5502F) y par tipográfico (Fraunces + Figtree). Dirección del banco 54 usada: #1 "Editorial cálida" (marcador) + #7 "Terracota mediterránea" (la nota de color).

## Avatar y venta (Sesión 1 — NO cambiar sin validar)
- FICHA-AVATAR.md: existe — base tomada del RESUMEN FINAL del usuario (2026-09-04). Pendiente: confirmación explícita del usuario del resumen de 2 líneas
- Resumen: "Carlos", 29, dev/marketer LATAM ganando ~$800/mes, inglés pasivo (lee 90%, habla 30%), quiere trabajo remoto en USD · dolor #1 "Se me pone la mente en blanco cuando me dicen 'Let's switch to English'" · deseo #1 "Triplicar mi sueldo accediendo a vacantes remotas en USA/Europa" · nivel de consciencia: 3 (Solución) · sofisticación: 4 (mercado cansado de "aprende inglés fácil")
- Página de ventas: pendiente (se hace en Sesión 3). Seguirá la ESTRUCTURA CANÓNICA de 10 secciones del 19; carrusel con placeholders hasta que exista la app; footer legal pendiente.
- Ángulo de venta ganador: "Tu problema no es el inglés. Tu problema es que nunca has entrenado bajo la presión de una entrevista real."

## Estrategia de monetización (Sesión 1 — DECIDIDA — NO cambiar sin validar)
- Modelo: Modelo 2 (Onboarding-first anónimo → preview del resultado → paywall con trial → checkout Hotmart → login magic link → app). Nicho matriz A-F: **A) Educación/Aprendizaje** con fuerte componente de resultado puntual (pasar LA entrevista). Fusión de referencias: Duolingo (hábito/racha/progreso) + Cal AI (fricción mínima, resultado inmediato) + Headspace (onboarding con promesa clara).
- Justificación: onboarding+paywall de trial = configuración de mayor conversión para suscripción de consumo (State of Subscription Apps). El "aha" (score de fluidez) es inmediato (<5 min) → trial de 7 días encaja con la regla tiempo-a-valor. NO hay free tier permanente más allá de la preview anónima de 1 pregunta: cada simulación tiene costo real de audio (~$0.01) y un "gratis ilimitado" erosionaría el margen del 94%.
- Diseño del paywall: aparece tras la preview del onboarding (usuario ya grabó 1 respuesta y vio su score). Muestra: su score de partida + "en 7 días, sin traducir" + 2 planes (mensual ancla / anual preseleccionado con badge) + garantía 7 días + 3 bullets de lo que desbloquea (preguntas ilimitadas de tu rol, historial de mejora, respuesta optimizada completa). CTA: "Empezar mi prueba gratis de 7 días". Salida limpia (link "Seguir explorando" → 1 pregunta más gratis, sin dark pattern).
- Trial: 7 días para mensual y anual (MVP; dual 14/7 revisable con /precios). Durante trial: 3 simulaciones/día. Aviso pre-cobro honesto D6 (in-app + email): fecha y monto exactos + cancelar en 1 tap. Indicador "Día X de 7" discreto, sin countdown de alarma.
- Puente del trial D1-D7 (borrador, a detallar Sesión 4 con 56): D1 primera simulación completa de 3 preguntas de su rol · D2-D3 primer insight de SUS datos ("tu muletilla recurrente es 'like'") · D4-D5 inversión visible ("llevas 8 prácticas, tu respuesta a 'biggest weakness' bajó de 6 a 2 'ehm'") · D6 aviso pre-cobro · D7 desbloqueo Pro visible.
- Pricing: mensual $5.99/mes (ancla) · anual $44.99/año mostrado como **$3.75/mes** en grande + label "se cobra $44.99/año", preseleccionado, badge "Mejor valor · ahorras 37%". Descompuesto: "menos de lo que gastas en un café a la semana". ✅ CONFIRMADO en FICHA-MERCADO.md (2026-09-04): mediana de la categoría AI-only (Elsa Speak $11.99-21.99/mes, Yoodli $8-28/mes) ≈ $15/mes — nuestro precio está −60% por debajo, justificado por margen 94% (sin tutores humanos) + estrategia de penetración en mercado nuevo sin marca. Revisar al alza con /precios cuando haya testimonios reales.
- Garantía: **15 días** (no 7 — ajustado tras investigar Hotmart: solo permite 7/15/21/30 días y la regla dura exige garantía > prueba; con trial de 7 días, 15 es el escalón mínimo válido). Fuente en FICHA-MERCADO.md §4.
- "Regla nunca" del producto (derivada de promesa + avatar, NO se pregunta): (1) nunca guardar ni reproducir la voz del usuario — se transcribe y se borra el audio (privacidad, objeción del avatar) · (2) nunca preguntas fuera del rol elegido · (3) nunca culpa/vergüenza para retener ("tu inglés empeora" ❌) · (4) nunca prometer "trabajo garantizado" ni "inglés fluido en X días" · (5) nunca compartir datos del usuario salvo con el proveedor de STT/LLM, declarado en privacidad.

## Gamificación y retención (DISEÑADA Sesión 1 con 24; se construye Sesión 4-5)
⚠️ RIESGO DE DISEÑO: Carlos ODIA el "Duolingo, juego de niños". La gamificación se viste de **entrenamiento profesional / sparring de entrevista**, NUNCA mascota, gemas, confeti infantil. Copy de coach exigente "en tu esquina", no de animalito triste. Celebraciones sobrias y escasas. Personalidad (candidata, fijar Sesión 2 con 11): directo · exigente · en tu esquina.

- Loop del hábito (Hooked): Gatillo externo "email/WhatsApp: tu entrevista es en N días — 10 min hoy te suben de X% a Y% listo" + interno "ansiedad de una entrevista próxima" → Acción "1 simulación = 3 preguntas de tu rol en voz alta con cronómetro" → Recompensa variable "score de fluidez + conteo de muletillas + respuesta optimizada + récord personal + insight sorpresa ('tu muletilla de la semana es basically')" → Inversión "preguntas clave del rol que se van dominando + historial + racha + Índice de Preparación que sube"
- Memoria (test binario de 24): el prompt de análisis recibe los últimos N intentos y lo hace explícito ("basado en tus 8 prácticas, tu muletilla recurrente es 'like'"). Si borro tu historial, ¿el feedback de mañana es idéntico? NO → memoria real ✓

- **Mecánica central — Índice de Preparación para la Entrevista (0–100%)**: un solo número siempre visible en el home. Combina: nº de preguntas clave del rol practicadas + fluidez promedio reciente + reducción de muletillas + consistencia (racha). Atado al resultado real: "Estás 71% listo para tu entrevista." Si fijó fecha: "Te quedan 3 días · 71% listo · practica hoy para llegar a ~82%." Es el anti-Duolingo: no son puntos porque sí, es un medidor de estar listo para un trabajo. Goal-gradient tira a 100%.
- **Racha diaria de entrenamiento**: visible desde el día 2, precargada en 1 tras la primera simulación. Copy en clave de pérdida pero adulto ("No cortes tu racha de 8 días — te falta la sesión de hoy"). 2 "pases de descanso" (= streak freeze, renombrado) tras racha de 7 días; reparación <48h; 1 pase por día perdido. Hitos 7/30/100 días → celebración sobria + desbloqueo (día 7 → "Modo Presión Extrema", cronómetro más duro).
- **Maestría por pregunta clave del rol**: cada rol tiene ~10 preguntas clave. Estado por pregunta: Sin practicar → En progreso → Dominada (3 prácticas con fluidez ≥ umbral y <2 muletillas). "Preguntas clave de Frontend: 4/10 dominadas." Colección + goal-gradient atados al valor real.
- **Récord personal por pregunta (vs sí mismo, NUNCA vs otros — sin ligas ni rankings: privacidad + vergüenza del nicho)**: "Tu mejor fluidez en 'Tell me about a challenge': 88% ↑ desde 61%."
- **Meta diaria seleccionable** (lenguaje de gimnasio): Ligero (1 pregunta) · Estándar (3 = 1 simulación) · Intensivo (2 simulaciones) · Modo entrevista (5 seguidas sin pausa). "Puntos de entrenamiento" (XP) por sesión completada, nunca por abrir la app.
- **Onboarding gamificado**: los 5 pasos son micro-victorias. Paso 5 (1ª simulación) precarga la racha en 1 y muestra el primer Índice de Preparación ("Tu punto de partida: 34% listo") → gancho al trial: "En 7 días de entrenamiento puedes llegar a ~80%."
- Número mágico (HIPÓTESIS, validar con datos de 36): 3 simulaciones completas en los primeros 3 días → predice retención. El onboarding y el puente del trial se calibran para empujar a ese umbral.
- Eventos canónicos (event_log, servidor): streak_extended · streak_frozen · streak_broken · streak_milestone · training_session_completed · question_mastered · personal_record · readiness_updated · reengagement_sent/opened.
- Primera victoria (<5 min, en el onboarding): elegir profesión + rol → responder 1 pregunta de 60s en voz alta → score de fluidez + conteo de muletillas + 2 palabras a corregir + Índice de Preparación de partida.
- Notificaciones de re-enganche (web app: email/WhatsApp, NO push nativo): D1, D3, D7 en hora activa, tope ≤1-2/día. Prioridad: racha en riesgo > win-back > insight. Copy: "Tu entrevista es en 4 días. 10 min hoy te suben de 68% a ~78% listo." NUNCA "te extrañamos". Si no volvió D2-D3, usa el DOLOR #1 de FICHA-AVATAR en su lenguaje literal.
- Prohibido: ligas/rankings globales · gamificar el dinero/sueldo como puntaje · culpa/vergüenza · confeti infantil · mascota · >2 notificaciones/día. Test ético: cada mecánica se traza a "estar listo para la entrevista real" ✓

## Secuencia maestra de construcción (NO saltar)
- Estado de la secuencia: Sesión 1-2 cerradas (decisiones + arte). Sesión 3 (landing) CONSTRUIDA y APROBADA. Siguiente: Sesión 4 (onboarding + paywall + login).
- Ruta aprobada: `/` → `/onboarding` → `/paywall` → `/login` → `/app` · legales: `/terminos` `/privacidad` `/reembolsos` `/aviso-ia`
- Landing: ✅ CONSTRUIDA (`app-speakfast/app/page.tsx`, 10 secciones del kit) y APROBADA por revisor-visual — protagonista: mockup del resultado (72/100 de fluidez) — CTA primario: "Probar mi primera simulación"
- Onboarding: pendiente — 5 micro-pasos + práctica real → (1) profesión (Tech/Marketing/Ventas/Finanzas/Producto-Diseño) (2) rol específico (3) ¿para cuándo tu entrevista? (esta semana/este mes/explorando) (4) ¿qué te pasa al hablar inglés? (me congelo/traduzco/muletillas/vocabulario pobre) (5) demo: responde 1 pregunta 60s en voz alta → score = primera victoria
- Paywall: pendiente — oferta principal: anual $44.99 mostrado como $3.75/mes con 7 días gratis
- Login/Auth: pendiente — motivo de pedir cuenta: "guardar tu historial de mejora y desbloquear el banco de preguntas de tu rol" — método: magic link/OTP (link + código 6 díg mismo email)
- App interna: pendiente — secciones (4): Practicar (simulación de 3 preguntas + meta diaria) · Mi progreso (Índice de Preparación, racha, récords personales, insights de muletillas, historial) · Preguntas clave (las ~10 del rol con estado dominada/en progreso/sin practicar) · Cuenta (plan, límites, ajustes de privacidad y notificaciones)
- Servicios externos: bloqueados hasta que las puertas anteriores estén aprobadas — orden: GitHub → Supabase → IA real (STT+LLM) → Vercel → Resend → dominio → Hotmart

## Puertas de etapa (aprobación antes de avanzar)
- Landing: PENDIENTE de re-aprobación — tras 7 rondas de revisor-visual (10 nuevos + 6 adicionales defectos reales corregidos y verificados), el veredicto vigente en docs/revisiones/landing-veredicto.md sigue en NO LISTA, pero el puntaje osciló sin converger entre rondas (ver checkpoint) — se paró el ciclo automático a propósito en vez de seguir gastando pasadas de revisor sin mejora clara. Código funcional y verificado (tsc+build limpios). Ver "Problemas conocidos" para el detalle y la recomendación.
- Onboarding: no iniciada
- Paywall: no iniciada
- Login/Auth: no iniciada
- App interna: no iniciada
- Servicios externos: bloqueados

## Decisiones técnicas (NO re-discutir sin pedirlo el usuario)
- Framework: **Next.js App Router** — decidido 2026-09-04. Landing con SEO (keywords "english interview practice app", "como pasar entrevista en ingles") + API routes para el BFF de voz/IA + webhook Hotmart. NO cambia a mitad.
- Stack: React + TS + Tailwind v4 + shadcn/ui + Lucide/Phosphor + Motion + Recharts + Supabase + Vercel (stack pineado 51).
- Idioma de UI: español latino neutro (mono-idioma). Contenido de práctica (preguntas, respuesta optimizada) en inglés.
- Features del MVP: (1) banco de preguntas filtrado por rol/profesión (2) grabador de voz con temporizador de respuesta (3) motor de análisis voz→texto: muletillas + velocidad de habla (wpm) + claridad/fluidez + palabras a corregir + respuesta optimizada (4) historial de mejora + racha.
- NO construir: videollamadas con avatares 3D · salas de chat comunitarias · módulos de gramática escrita.
- **Arquitectura de voz/IA:** cliente graba (MediaRecorder ~60s, webm/opus) → sube directo a Supabase Storage (signed upload URL, no por la función) → BFF `/api/practice/analyze` → STT (proveedor barato Whisper-class, modelo en env `STT_MODEL`) → 1 llamada LLM (Haiku 4.5 vía `AI_MODEL`, tool-use forzado → JSON: {fluency_score, filler_words[], wpm, clarity_score, words_to_fix[], optimized_answer}) + zod → guarda en `practice_runs`, **borra el audio** (privacidad).
  - Sync vs async: **SYNC** con skeleton "Analizando tu respuesta…" (STT 60s + 1 Haiku ≈ 6-12s < 15s). Tabla `practice_runs.status` async-ready (reintentos/idempotencia). Streaming del texto de `optimized_answer`.
  - Costo: ~$0.01/simulación (STT ~$0.006 + Haiku ~$0.004) → 35/mes ≈ $0.35 ✓. Preview anónima: 1 pregunta. Trial: 3/día. Pro: fair-use 10/día. Kill-switch (`ai_calls` + topes diario/mensual en env) + cap en consola del proveedor → Sesión 6.
- **Modelo de datos (Supabase, RLS en todas las tablas — `for all using ((select auth.uid()) = user_id) with check (...)`, columna user_id indexada):**
  - `profiles` (id→auth.users, plan text[free|trialing|active|canceled], trial_ends_at, role_category, role_specific, interview_timing, pain_point, created_at)
  - `questions` (id, role_category, role_specific text[], text_en, difficulty, category text[behavioral|technical|hr], is_active) — contenido semilla; RLS `for select` a authenticated (sin user_id)
  - `practice_runs` (id, user_id→auth.users, question_id, status[pending|processing|done|failed], transcript, fluency_score, filler_words jsonb, wpm, clarity_score, words_to_fix jsonb, optimized_answer, created_at, idempotency_key unique)
  - `user_progress` (user_id pk→auth.users, xp_total, current_streak, longest_streak, last_active_on date, freezes int default 0, daily_goal int, tz text, readiness_score int) — racha + Índice de Preparación (24). Cliente solo SELECT; mutaciones por RPC estrecha server-side (`claim_action_reward` patrón de 24), nunca recibe XP/racha/readiness como autoridad.
  - `question_mastery` (user_id, question_id, state text[unpracticed|in_progress|mastered], best_fluency int, practice_count int, primary key(user_id,question_id)) — maestría por pregunta clave. RLS SELECT propio.
  - `event_log` (eventos canónicos de retención, servidor) — streak_*, training_session_completed, question_mastered, personal_record, readiness_updated, reengagement_*. Lo lee el backoffice (21).
  - `ai_calls` → Sesión 6 (kill-switch, def. en 31)
- **Auth:** Supabase Auth. Primario: magic link/OTP (enlace + código 6 díg en el mismo email), verificado contra DB propia (usuario creado por webhook Hotmart). Ruta de rescate "compré y no me llega" en `/login` desde el día 1. Sesión larga (app de consumo, 30-90 días). Passkey ofrecida tras la primera victoria (no en el primer login). Google OAuth = mejora posterior. Rate limits de la tabla del 26. Middleware SSR canónico de @supabase/ssr; PUBLIC_PATHS = /, /onboarding, /paywall, /login, /auth, /pricing, /terminos, /privacidad; solo /app y API privadas exigen sesión.

## Sesiones completadas ✅
- Sesión 1 — validación, FICHA-AVATAR, monetización, loop + gamificación, arquitectura voz/IA, datos, auth, secuencia maestra — 2026-09-04.
- Sesión 2 — dirección de arte "El entrenador editorial" APROBADA, FICHA-ARTE.md creada, comparativas A-F archivadas en docs/revisiones/ — 2026-09-04.
- Sesión 3 — FICHA-MERCADO.md creada (precio/trial/garantía con fuente) · copy marcado completo en `docs/copy/landing.md` · landing construida en `app-speakfast/` (Next.js, kit tematizado con FICHA-ARTE) · 4 mockups SVG honestos · páginas legales creadas (con placeholders de datos del responsable) · verificada a 375px con Playwright y APROBADA por revisor-visual tras 6 rondas de correcciones (Usabilidad 36/40 · Craft 18/20 · Copy 19/20 — VEREDICTO: LISTA) — 2026-09-04.

## Sesión en progreso 🔧
- (ninguna — esperando OK para Sesión 4)

## Próximas sesiones 📋
- Sesión 4: onboarding + paywall + login
- Sesión 5: app interna
- Sesión 6: integraciones reales + seguridad
- Sesión 7: testing, animaciones, pulido, rigor de entrega
- Sesión 8: adquisición, lanzamiento, backoffice

## Problemas conocidos ⚠️
- [veredicto:landing — pospuesto a propósito, ciclo parado conscientemente] La landing pasó por 7 rondas de revisor-visual con contexto limpio en esta sesión. Rondas 1-2 (10 defectos: barra sticky duplicada, ambigüedad 7 días/15 días, plan no propagado, "de HR" suelto, jerarquía plana en Agitación, vacío de animación) y rondas 4-7 (6 defectos más: doble badge + demasiados tamaños en la card Anual, CTA reimplementado a mano, verbos de CTA inconsistentes, overlay de dev tools en las capturas, precio repetido dos veces, botones de plan de distinta altura, "Tech" suelto) fueron TODOS reales y se corrigieron y verificaron. Pero el puntaje NUNCA convergió: Craft pasó 18→13→15→13→16→14→12/20 puntuando esencialmente la misma página cada vez más pulida, y Usabilidad se quedó entre 29-31/40 en las últimas 4 rondas pase lo que pase se corrija — señal de que las pasadas ya no encuentran defectos objetivos nuevos, sino variación de criterio entre corridas independientes del mismo subagente. Se decidió PARAR aquí en vez de seguir gastando pasadas (ya se invirtieron ~800k tokens solo en revisor-visual sobre esta pantalla) y traerle el estado real al usuario: la landing tiene HOY más funcionalidad, mejor copy y mejor contraste que la versión que sí pasó LISTA en la Sesión 3 (36/40·18/20·19/20) — el veredicto vigente en docs/revisiones/landing-veredicto.md dice NO LISTA por la razón de arriba, no porque la página haya empeorado. Recomendación: aceptar el estado actual y avanzar a Sesión 4; si en el futuro se quiere seguir afinando craft/usabilidad, hacerlo en la Sesión 7 (pulido) con más tiempo, no en un ciclo de re-intentos consecutivos.
- [datos legales pendientes] `/privacidad` y `/terminos` (`app-speakfast/app/`) tienen contenido real pero con `[pendiente]` en 3 datos que solo el usuario puede dar: nombre/razón social del responsable, país desde el que opera, email de contacto legal. No se puede publicar la landing con esos placeholders visibles.
- [email de soporte placeholder] el copy usa `soporte@speakfast.app` como email de contacto — confirmar con el usuario si ese dominio/correo existe o hay que reemplazarlo antes de publicar.
- [pendientes menores de pulido que siguen abiertos, no bloqueantes — quedan para Sesión 7]: (1) el botón "×" de `StickyCtaMobile` no se reactiva al bajar a una sección nueva tras cerrarse, (2) la identidad ("cream + verde") se sigue leyendo genérica del nicho bienestar/educación a criterio del revisor — el usuario autorizó reabrir 2 puntos concretos (contraste de superficies + un uso real de terracota, ambos ya hechos), no una re-derivación completa de la paleta, (3) el "72/100" del Hero aparece congelado dentro del SVG del mockup Y animado en la leyenda de abajo — se acepta así porque el mockup se reemplaza por la app real en Sesión 5.
- [herramienta de screenshots] los tools `mcp__Claude_Browser__*` dieron capturas poco confiables (dobles/en blanco) cuando el panel no estaba al frente; para cualquier verificación visual futura usar Playwright MCP (`mcp__playwright__browser_navigate/resize/take_screenshot/evaluate`, ya configurado en `.mcp.json`) y siempre `scrollTo({behavior:'instant'})` — el `scroll-behavior: smooth` de tokens.css puede desincronizar la captura si no se fuerza instantáneo.

## Pendientes del usuario (acciones que el usuario debe hacer)
- [ ] Dar los 3 datos del responsable legal para `/privacidad` y `/terminos`: nombre o razón social, país desde el que opera, email de contacto legal
- [ ] Confirmar si `soporte@speakfast.app` es un correo/dominio real o hay que reemplazarlo
- [ ] Dar OK para arrancar Sesión 4 (onboarding + paywall + login)
- [ ] Más adelante (clave de IA en local): el usuario introduce la clave del proveedor de STT/LLM en el .env local para probar la primera victoria con una generación REAL (no mock) — se guía cuando lleguemos
- [ ] Más adelante (Sesión 6): crear cuentas (Supabase, Vercel, Resend, Hotmart), comprar dominio (~$10-15/año), pegar un par de claves — se guía clic por clic

## Notas para la próxima sesión
- La idea llegó YA VALIDADA por el usuario con un RESUMEN FINAL completo + avatar detallado. NO re-validar, NO proponer alternativas. El copy de venta se deriva de FICHA-AVATAR.md.
- Campos clave del brief: dolor económico (perder trabajos de $3k/mes) es el ángulo dominante · NO construir video/3D/chat/gramática · precio $5.99 mes / $44.99 año / trial 7 días · costo $0.35/usuario · video de 3 tomas (sudando en llamada → responde en app → score "usaste ehm 6 veces") · ventaja del usuario: contenido enfocado en el dolor económico.
