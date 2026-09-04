# ESTADO — SpeakFast
Última actualización: 2026-09-04 | Sesión actual: 1

⏸️ CHECKPOINT — Última acción completada: RESUMEN FINAL validado pegado por el usuario + ESTADO/FICHA-AVATAR creados / Siguiente acción exacta: iniciar Sesión 1 (leer 02-VALIDACION + 02C-PRICING + 04-ARQUITECTURA + 25 + 26 + 30) — decidir modelo de monetización (matriz A-F), arquitectura de voz/IA sync-async, modelo de datos, auth

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

## Dirección de Arte (Sesión 2 — NO cambiar sin justificación)
- FICHA-ARTE.md: NO creada aún — se hace en Sesión 2
- ¿Hubo referencia visual del usuario?: NO (pendiente preguntar gustos visuales en Sesión 2 con opciones A/B/C)
- Resumen: pendiente
- Personalidad: pendiente (candidatos del brief: directo / de combate / sin condescendencia)
- REGISTRO ANTI-REPETICIÓN: pendiente

## Avatar y venta (Sesión 1 — NO cambiar sin validar)
- FICHA-AVATAR.md: existe — base tomada del RESUMEN FINAL del usuario (2026-09-04). Pendiente: confirmación explícita del usuario del resumen de 2 líneas
- Resumen: "Carlos", 29, dev/marketer LATAM ganando ~$800/mes, inglés pasivo (lee 90%, habla 30%), quiere trabajo remoto en USD · dolor #1 "Se me pone la mente en blanco cuando me dicen 'Let's switch to English'" · deseo #1 "Triplicar mi sueldo accediendo a vacantes remotas en USA/Europa" · nivel de consciencia: 3 (Solución) · sofisticación: 4 (mercado cansado de "aprende inglés fácil")
- Landing: sigue la ESTRUCTURA CANÓNICA de 10 secciones del 19 — carrusel con placeholders hasta que exista la app · footer legal: pendientes
- Ángulo de venta ganador: "Tu problema no es el inglés. Tu problema es que nunca has entrenado bajo la presión de una entrevista real."

## Estrategia de monetización (Sesión 1 — NO cambiar sin validar)
- Modelo: PENDIENTE decidir en Sesión 1 (matriz A-F del 02C — educación/preparación profesional; probable onboarding-first: landing → onboarding → preview de resultado → paywall → login)
- Justificación: pendiente
- Diseño del paywall: pendiente
- Trial: 7 días (definido por el usuario) — diseño del puente D1-D7 pendiente
- Pricing: $5.99/mes mensual | $44.99/año mostrado como ~$3.75/mes ("2 meses gratis")

## Gamificación y retención
- Loop del hábito: PENDIENTE Sesión 4 (candidato: Gatillo "estoy postulando a un empleo" → Acción "simulación de 10 min" → Recompensa "score de fluidez + respuesta optimizada" → Inversión "banco de preguntas de mi rol + historial de mejora")
- Mecánicas: pendiente (candidatos: racha diaria de práctica, récord de fluidez, progreso por pregunta clave del rol)
- Primera victoria (<5 min): elegir puesto ("Frontend Developer") → responder 1 pregunta de 60s en voz alta → score de claridad inmediato + 2 palabras a corregir
- Notificaciones de re-enganche: pendiente

## Secuencia maestra de construcción (NO saltar)
- Estado de la secuencia: nada construido aún — arrancando Sesión 1 (decisiones)
- Ruta aprobada: `/` → `/onboarding` → `/paywall` → `/login` → `/app` (a confirmar tras Sesión 1)
- Landing: pendiente — protagonista: la simulación con feedback de fluidez — CTA primario: "Probar mi primera simulación gratis"
- Onboarding: pendiente — primera decisión: elegir rol/profesión
- Paywall: pendiente — oferta principal: anual $44.99 con 7 días gratis
- Login/Auth: pendiente — motivo de pedir cuenta: guardar historial de mejora y banco de preguntas del rol
- App interna: pendiente — secciones (3-5): Practicar (simulación) · Mi progreso · Banco de preguntas por rol · Ajustes
- Servicios externos: bloqueados hasta que las puertas anteriores estén aprobadas

## Puertas de etapa (aprobación antes de avanzar)
- Landing: no iniciada
- Onboarding: no iniciada
- Paywall: no iniciada
- Login/Auth: no iniciada
- App interna: no iniciada
- Servicios externos: bloqueados

## Decisiones técnicas (NO re-discutir sin pedirlo el usuario)
- Framework: PENDIENTE Sesión 1 (probable Next.js App Router — landing SEO + API routes para el BFF de voz/IA)
- Stack: React + TS + Tailwind v4 + shadcn/ui + Lucide/Phosphor + Motion + Supabase + Vercel (stack pineado 51)
- Features del MVP: (1) banco de preguntas filtrado por rol/profesión (2) grabador de voz con temporizador de respuesta (3) motor de análisis voz→texto: muletillas + velocidad de habla + claridad (4) reporte de mejora diario
- NO construir: videollamadas con avatares 3D · salas de chat comunitarias · módulos de gramática escrita
- Modelo de IA: PENDIENTE (STT para transcripción + LLM para análisis/feedback y "respuesta optimizada"; modelo en env var AI_MODEL) — costo objetivo ~$0.35/usuario/mes
- Idioma de UI: español latino neutro (mono-idioma). Contenido de práctica en inglés.

## Sesiones completadas ✅
- (ninguna)

## Sesión en progreso 🔧
- Sesión 1 — decisiones de producto/negocio y arquitectura. Punto: RESUMEN FINAL cargado; falta leer archivos de fase y decidir monetización + pilares técnicos.

## Próximas sesiones 📋
- Sesión 2: identidad visual y sistema de diseño (3 opciones A/B/C a 375px)
- Sesión 3: página de ventas (10 secciones canónicas)
- Sesión 4: onboarding + paywall + login
- Sesión 5: app interna
- Sesión 6: integraciones reales + seguridad
- Sesión 7: testing, animaciones, pulido, rigor de entrega
- Sesión 8: adquisición, lanzamiento, backoffice

## Problemas conocidos ⚠️
- (ninguno)

## Pendientes del usuario (acciones que el usuario debe hacer)
- [ ] Confirmar el resumen de 2 líneas del entendimiento (Sesión 1)
- [ ] Más adelante: crear cuentas (Supabase, Vercel, Resend, Hotmart), comprar dominio, pegar claves (se guía en Sesión 6)

## Notas para la próxima sesión
- La idea llegó YA VALIDADA por el usuario con un RESUMEN FINAL completo + avatar detallado. NO re-validar, NO proponer alternativas. El copy de venta se deriva de FICHA-AVATAR.md.
- Campos clave del brief: dolor económico (perder trabajos de $3k/mes) es el ángulo dominante · NO construir video/3D/chat/gramática · precio $5.99 mes / $44.99 año / trial 7 días · costo $0.35/usuario · video de 3 tomas (sudando en llamada → responde en app → score "usaste ehm 6 veces") · ventaja del usuario: contenido enfocado en el dolor económico.
