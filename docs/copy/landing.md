# COPY MARCADO — Página de ventas de SpeakFast

> Trazabilidad: TODO el copy sale de `FICHA-AVATAR.md` (avatar "Carlos") y `FICHA-MERCADO.md`
> (precio/trial/garantía). Modelo de monetización: **Modelo 2 anónimo (onboarding-first)** —
> todos los CTA llevan a `/onboarding`, nunca al checkout de Hotmart directo (ver ESTADO.md).
> Big Idea: "Carlos no pierde ofertas de trabajo por su inglés — las pierde porque nunca
> entrenó bajo la presión real de una entrevista. El Simulacro de Presión le pone esa presión
> ahora, para que el día real ya la haya vivido."
> Mecanismo bautizado: **el Simulacro de Presión** (aparece en Hero, Solución y Oferta).

## PROCESO DE HEADLINE (10 variantes puntuadas — 52 §1bis, gate de cierre)

| # | Variante | Útil | Urgente | Ultra-esp. | Único | Total |
|---|---|---|---|---|---|---|
| 1 | "¿Te congelas apenas te dicen 'Let's switch to English'?" | 2 | 1 | 2 | 2 | 7 |
| 2 | "El Simulacro de Presión: de te congelas a hablas fluido" | 3 | 1 | 1 | 3 | 8 |
| 3 | "Deja de practicar inglés sin presión real" | 2 | 1 | 1 | 2 | 6 |
| 4 | "Cada entrevista sin entrenar te cuesta la oferta en dólares" | 3 | 2 | 1 | 2 | 8 |
| 5 | "Habla sin trabarte en tu próxima entrevista, 10 min al día" | 3 | 2 | 3 | 1 | 9 |
| 6 | "Cómo hablar fluido en tu entrevista sin pagar un profesor" | 3 | 1 | 1 | 1 | 6 |
| **7** | **"Entiendes inglés. Te congelas en la entrevista."** | **3** | **2** | **2** | **2** | **9** |
| 8 | "El Simulacro de Presión te prepara para no trabarte" | 3 | 1 | 1 | 3 | 8 |
| 9 | "Hoy entrenas presión. En tu entrevista, hablas sin trabarte." | 3 | 2 | 1 | 2 | 8 |
| 10 | "Para quien entiende inglés perfecto pero se congela al hablarlo" | 2 | 1 | 1 | 2 | 6 |

**PASO 3 — Elige:** gana #7 (9/12).
**PASO 4 — Test del bar:** "Entiendes inglés. Te congelas en la entrevista." — se dice en voz alta sin vergüenza, suena a cómo Carlos se describe a sí mismo (FICHA-AVATAR: "Entiendo el 90%... pero mi mente se pone en blanco"). Pasa.
**PASO 5 — Test de intercambiabilidad:** ¿Duolingo o Cambly podrían firmarla? Ellos venden "aprender inglés" en general, nunca la escena específica de "la entrevista" — la especificidad del contexto (trabajo, no clase) la vuelve propia. Pasa. El mecanismo bautizado se inyecta en el subtítulo.

Variantes subcampeonas (#2, #4, #5, #8, #9) se guardan como hipótesis de A/B para cuando haya tráfico (37).

**Nivel de consciencia del tráfico principal (52 §1bis):** 2-3 (consciente del problema / de la solución — tráfico de búsqueda "app para entrevistas en inglés" + descubrimiento en redes). Página de largo medio, oferta a mitad, problema con contraste corto — no la versión mínima de nivel 5.

---

## 1. HERO

```
appName: "SpeakFast"
h1Marked: "Entiendes inglés. Te [acento]congelas[/acento] en la entrevista."
subtitleMarked: "El [b]Simulacro de Presión[/b] te hace practicar tu entrevista real, con cronómetro."
ctaLabel: "Probar mi primera simulación"
ctaHref: "/onboarding"
socialProof: "Garantía Hotmart de 15 días — sin preguntas"
visual: /mockups/resultado.svg (mini-demo del resultado, en frame de teléfono — ya NO es el placeholder dashed)
visualPlaceholderSugerencia: "captura de la pantalla de resultado con tu puntaje de fluidez y las muletillas detectadas" (queda como sugerencia para cuando exista el screenshot real, Sesión 5)
```
Traza: H1 = dolor #1 literal de la ficha ("Se me pone la mente en blanco... 'Let's switch to English'", comprimido). Subtítulo = mecanismo + nivel de consciencia 3 (nombra el mecanismo, no solo agita).

## 2. PROBLEMA (4 preguntas — dolores #1-4 de la ficha)

```
titulo: "¿Te suena?"
preguntas:
  1. icon: CloudFog   · "¿Se te congela la mente al oír 'Let's switch to English'?"
  2. icon: Repeat     · "¿Traduces cada frase en tu cabeza antes de responder?"
  3. icon: MessageCircleWarning · "¿Llenas los silencios con 'ehm' y 'like' sin darte cuenta?"
  4. icon: TrendingDown · "¿Ves a otros con menos nivel técnico conseguir el puesto remoto?"
```
Traza: dolores 1, 3(muletillas), 2(traduce), y el dolor de estatus/identidad ("me da rabia ver a gente con menos capacidad... quedarse con los mejores puestos").

## 3. AGITACIÓN (costo de la inacción — cuantificado de la ficha)

```
frases:
  1. "Cada mes que sigues igual, tu sueldo se queda [acento]lejos[/acento] de lo que pagan los roles remotos."
  2. "En un año, son [b]12 meses más[/b] postulando y congelándote en la misma llamada."
  3. "El espejo y los cursos de gramática no arreglan esto: nunca sintieron la presión real."
contraste:
  labelHoy: "Hoy"
  hoy: "Ganas en tu moneda local mientras ves vacantes remotas pagadas en dólares."
  labelFuturo: "En 6 meses, si nada cambia"
  futuro: "Sigues aplicando, sigues congelándote en la llamada, y sigues igual."
```
Traza: COSTO DE LA INACCIÓN de la ficha ($800→$3.500/mes). ⚠️ Ajustado tras revisor-visual (2026-09-04): la versión anterior citaba "$2.700 USD que sí podrías ganar" / "$32.400 USD que ya no vuelven" — leía como PROMESA DE INGRESOS (violación de la regla 3 de copy/19 §3), no como pérdida propia documentada. Se reescribió en TIEMPO (meses postulando), el mismo patrón que usa el ejemplo aprobado de 19 §3 ("pierdes 5 horas... en 6 meses, 130 horas que no vuelven"). La cifra en dólares queda solo como contexto de mercado en FICHA-AVATAR/FICHA-MERCADO, nunca como promesa en copy público.

## 4. SOLUCIÓN (el mecanismo bautizado)

```
kicker: "EL MECANISMO"
tituloMarked: "Entrena la presión [acento]antes de vivirla[/acento]"
mecanismo: "el Simulacro de Presión"
bigIdeaMarked: "No te falta vocabulario — te falta haber entrenado bajo presión real. El Simulacro de Presión [b]te pone esa presión hoy[/b], con las preguntas exactas de tu puesto."
pasos:
  1. titulo: "Eliges tu rol" · detalle: "Frontend, marketing, ventas — el banco de preguntas es de tu profesión."
  2. titulo: "Respondes bajo cronómetro" · detalle: "60 segundos, en voz alta, la presión real de una llamada de HR."
  3. titulo: "Recibes tu puntaje" · detalle: "Fluidez, muletillas y tu respuesta reescrita, en segundos."
antesDespues:
  labelAntes: "Antes" · antes: "Te congelas, traduces, dices 'ehm' seis veces por respuesta."
  labelDespues: "Después" · despues: "Respondes en automático, sin traducir, con dos muletillas menos."
```
Traza: causa del fracaso anterior de la ficha ("ya intentó" — Duolingo, profesor, espejo — ninguno da presión real). Test de falsabilidad: Cambly tiene profesores pero no cronómetro de presión ni análisis de muletillas al instante; Elsa no simula preguntas de entrevista por rol. Pasa.

## 5. LA APP POR DENTRO (carrusel — placeholders, app aún no construida)

```
tituloMarked: "Así se ve tu [acento]Simulacro de Presión[/acento]"
frames (mini-demo HTML/SVG honesto — nivel 2 de la jerarquía de mockups de 19, no placeholders vacíos):
  1. src: /mockups/onboarding.svg · label: "Elige tu rol y cuándo es tu entrevista" · nombrePantalla: "Onboarding"
  2. src: /mockups/simulacion.svg · label: "Responde bajo presión, con cronómetro" · nombrePantalla: "Simulación"
  3. src: /mockups/resultado.svg · label: "Tu puntaje y tu respuesta reescrita" · nombrePantalla: "Resultado"
  4. src: /mockups/progreso.svg · label: "Tu Índice de Preparación, día a día" · nombrePantalla: "Mi progreso"
ctaLabel: "Probar mi primera simulación"
ctaHref: "/onboarding"
```
⚠️ PENDIENTE (anotado en ESTADO.md): reemplazar los 4 SVG por screenshots REALES a 375px cuando la app interna (Sesión 5) esté construida y verificada. Los SVG son esquemáticos a propósito (no pretenden ser una captura terminada) con datos semilla reales del dominio (rol, cronómetro, "72/100", "8 días" de racha).

## 6. OFERTA (anual + mensual, ambos con trial — FICHA-MERCADO §1/§4)

```
tituloMarked: "Empieza gratis. Sigue por [acento]$0.12 al día[/acento]"
trialDias: 7
stack:
  lineas:
    - resultado: "SpeakFast Pro con el Simulacro de Presión (12 meses)" · valor: "$180"
    - resultado: "Banco de preguntas de tu rol (Tech, Marketing, Ventas, Finanzas)" · valor: "$37"
    - resultado: "Reporte de mejora y racha de entrenamiento" · valor: "$27"
  totalTachado: "$244"
  nota: "Hoy: $3.75/mes (se cobra $44.99/año) · Garantía de 15 días"
anual:
  nombre: "Anual" · badge: "MÁS POPULAR" · precioMes: "$3.75"
  totalAnual: "Se cobra $44.99/año" · ahorro: "4 meses gratis" · descomposicionDia: "menos de $0.12 al día"
  ctaLabel: "Empezar mis 7 días gratis" · ctaHref: "/onboarding"
  features:
    - "Simulaciones de tu rol, todos los días"
    - "Tu Índice de Preparación siempre actualizado"
    - "Historial y récords de tu fluidez"
    - "Respuesta reescrita en cada simulación"
mensual:
  nombre: "Mensual" · precioMes: "$5.99"
  ctaLabel: "Elegir mensual" · ctaHref: "/onboarding"
  features:
    - "Simulaciones de tu rol, todos los días"
    - "Tu Índice de Preparación siempre actualizado"
    - "Historial y récords de tu fluidez"
    - "Cancelas cuando quieras"
```
Cálculo del ahorro (fórmula de 19 §6): 12 − (44.99 ÷ 5.99) = 12 − 7.51 = 4.49 → **4 meses gratis** (≈37%, ya validado en FICHA-MERCADO). Descomposición diaria: 44.99 ÷ 365 = $0.123 → "$0.12 al día".

## 7. GARANTÍA (nombre propio + piso Hotmart de FICHA-MERCADO §4)

```
nombre: "la Garantía de tu Primera Mejora"
condicionMarked: "Si en 15 días el Simulacro no te muestra una mejora real en tu fluidez, escribes un correo y [b]te devolvemos todo[/b]. Sin preguntas."
pisoLegal: "Respaldada por la garantía Hotmart de 15 días"
```
⚠️ 15 días (no 7): FICHA-MERCADO confirmó que Hotmart solo admite 7/15/21/30 y la regla dura exige garantía > prueba (7 días de trial) → 15 es el mínimo válido.

## 8. FAQ (las 6 objeciones reales de FICHA-AVATAR.md, 1:1, en su orden de fuerza)

```
abiertoInicial: 0
items:
  1. pregunta: "¿Puedo simplemente practicar frente al espejo, gratis?"
     respuestaMarked: "El espejo no te corrige la gramática ni las muletillas. Y aquí [b]nadie te escucha[/b]: tu voz se convierte a texto y se borra al instante."
  2. pregunta: "¿No es lo mismo que Duolingo o Elsa Speak?"
     respuestaMarked: "No. Ellas enseñan vocabulario con lecciones; SpeakFast [b]simula tu entrevista real bajo presión[/b], con las preguntas de tu puesto."
  3. pregunta: "¿Una IA puede simular la presión de un reclutador real?"
     respuestaMarked: "El Simulacro de Presión pone cronómetro estricto y [b]te marca si te quedas en silencio o repites muletillas[/b] — no solo transcribe."
  4. pregunta: "¿Por qué cuesta tan poco comparado con un profesor?"
     respuestaMarked: "Un profesor cobra $15-20 la hora; SpeakFast te da [b]práctica diaria por $3.75/mes[/b], todo el año."
  5. pregunta: "¿Es seguro pagar con mi tarjeta?"
     respuestaMarked: "Sí. El pago lo procesa [b]Hotmart[/b] (no nosotros), con tarjeta, PayPal y métodos locales de tu país."
  6. pregunta: "¿Por qué no practico gratis con ChatGPT o mi celular?"
     respuestaMarked: "Ninguno mide tu tiempo de respuesta en voz alta ni te marca el segundo exacto de cada muletilla — [b]el Simulacro de Presión sí[/b]."
```
Traza: mapea 1:1 contra las 6 "Objeciones reales" de FICHA-AVATAR.md — 1(espejo, fusionada con la reafirmación de privacidad del riesgo #1 del brief original), 2(Duolingo/Elsa), 3(IA no simula presión), 4(precio/profesor), 5(pago/checkout LATAM), 6(ChatGPT/nicho). Ajustado tras revisor-visual (2026-09-04, 2ª ronda): la 1ª versión omitía la objeción "espejo gratis" (la #1 de la ficha) y sobraban 2 preguntas no documentadas ("resultados", "privacidad" como ítem aparte) — se reescribió para trazar exactamente contra la ficha, sin inventar ni omitir.

## 9. CTA FINAL EMOCIONAL + PS

```
h2Marked: "Vive la presión [acento]antes de la entrevista real[/acento]"
futurePacingMarked: "Te sientas, eliges tu rol, respondes bajo cronómetro — y en minutos ya sabes exactamente qué corregir."
ctaLabel: "Probar mi primera simulación"
ctaHref: "/onboarding"
recap: "la Garantía de tu Primera Mejora · 7 días gratis"
psMarked: "PS: SpeakFast te hace entrenar bajo presión real con el Simulacro de Presión antes de tu entrevista de verdad. Hoy entras con 7 días gratis y la Garantía de tu Primera Mejora — tu voz nunca se guarda."
```
Sin urgencia de fundadores: no hay oferta de fundadores operativa todavía (cupo/fecha reales) — se activa en Sesión 8 (Lanzamiento) si aplica.

## 10. FOOTER LEGAL

```
appName: "SpeakFast"
enlaces:
  - { label: "Privacidad", href: "/privacidad" }
  - { label: "Términos y Condiciones", href: "/terminos" }
  - { label: "Reembolsos", href: "/reembolsos" }
  - { label: "Aviso de IA", href: "/aviso-ia" }
soporteEmail: "soporte@speakfast.app"
```
⚠️ PENDIENTE: `soporte@speakfast.app` usa el nombre de la app como dominio provisional — se confirma/activa cuando se compre el dominio real y se configure Resend (Sesión 6). Las 4 páginas legales se crean en este mismo cierre de sesión (47) para que ningún enlace del footer quede muerto.

## AJUSTES TRAS REVISOR-VISUAL (1ª ronda, 2026-09-04)

Veredicto inicial: NO LISTA (Usabilidad 29/40 · Craft 13/20 · Copy 15/20). Correcciones aplicadas:
1. **Agitación reescrita en tiempo, no en dólares** (ver arriba) — evita leer como promesa de ingresos.
2. **Carrusel con mini-demos SVG honestos** (ver arriba) — reemplaza los placeholders de solo texto.
3. **`/entrar` creado** (antes 404) — stub honesto "próximamente", mismo patrón que `/onboarding`.
4. **Dispositivo ownable implementado**: `<Accent>` del kit ahora lleva el subrayado marcador (banco 54 dir. 1) además del color — aplica solo a `[acento]` de titulares (H1/H2), nunca a párrafos de cuerpo, así que no satura la vista.
5. **FAQ a 6 ítems** (tope del kit) incluyendo la objeción de pago/checkout LATAM que faltaba.
6. **Garantía repetida junto a la oferta**: se agregó al `stack.nota` de la sección Oferta, no solo en el CTA final.

## AJUSTES TRAS REVISOR-VISUAL (2ª ronda, 2026-09-04)

Veredicto 2ª ronda: NO LISTA (Usabilidad 29/40 · Craft 14/20 · Copy 19/20 — el copy ya pasaba el umbral). Correcciones:
1. **Hero SÍ recibe `visual`** ahora: faltaba pasar la prop `visual` a `<Hero>` en `app/page.tsx` — el mockup `/mockups/resultado.svg` ya estaba construido pero nunca se conectó. Corregido con un frame de teléfono pequeño centrado (no el ancho completo del placeholder).
2. **Marcador ahora en terracota (`--accent-2`)**, no verde: `<Accent>` en `ui.tsx` usaba `var(--accent)` para el fondo del subrayado — FICHA-ARTE exige la 2ª nota terracota ahí. Corregido.
3. **Garantía repetida pegada al CTA real**: se agregó la prop `garantiaTexto` a `<Oferta>` (nueva, propia de este proyecto) que renderiza "🔒 15 días de garantía · cancelas cuando quieras" debajo de AMBAS cards, además de la nota del stack de arriba.
4. **FAQ reescrita para trazar 1:1 contra los 6 objeciones de la ficha** (ver arriba) — antes faltaba "espejo gratis" (la objeción #1) y sobraban 2 preguntas no documentadas.

## AJUSTES TRAS REVISOR-VISUAL (3ª ronda, 2026-09-04)

Veredicto 3ª ronda: NO LISTA (Usabilidad 29→32/40 · Craft 14→15/20 · Copy 20/20 — ya pasa el umbral). Correcciones de craft/usabilidad (el copy ya no se toca):
1. **Conteo animado real**: nuevo componente `<CountUpNumber>` (ui.tsx) — cuenta 0→72 al entrar en viewport (55 T4). Se usa en una leyenda bajo el mockup del Hero: "Así se ve tu resultado: 72/100 de fluidez" (nunca "ejemplo real" — es un mockup ilustrativo, no un resultado verificado).
2. **Sticky CTA mobile con botón de cerrar** (heurística Nielsen 3, control del usuario): la barra fija ahora tiene una "×" que la descarta por el resto de la sesión.
3. **Marcador terracota más visible en texto chico**: se subió el color-mix de `--accent-2` de 28%→42% y se ajustó la banda del subrayado — antes se leía verdoso/apagado en palabras cortas como "lejos" o dentro de un H2 con menos peso.
4. **Isotipo de marca unificado**: el círculo de respaldo (cuando no hay logo real) usaba `rounded-[8px]` + verde en el header y `rounded-[6px]` + gris en el footer — ahora ambos usan `rounded-[var(--radius-button)]` + `var(--accent)`.
5. **Más aire entre el stack de valor y las cards de precio** en Oferta (`mt-10`→`mt-12`, dentro de la escala 4·8·12·16·24·32·48·64) — el revisor señaló que los números del stack competían visualmente con los precios grandes de las cards.

## AJUSTES TRAS REVISOR-VISUAL (4ª ronda, 2026-09-04)

Veredicto 4ª ronda: NO LISTA — Usabilidad 34/40 (subió de 32), **Craft 17/20 (YA PASA el umbral de 16)**, Copy 20/20 (sin cambios, sigue pasando). Solo faltaba usabilidad. 5 defectos, 4 corregidos:
1. Isotipo del footer "se veía distinto" al del header pese a código idéntico → se confirmó FALSO POSITIVO tras rebuild limpio + reinicio del dev server (probable caché stale en la captura anterior): ambos usan el mismo verde, verificado visualmente en `landing-375-09-footer.png`.
2. Marcador terracota subido de 42%→58% de mezcla y banda de 50/50 (antes 56/44) — ahora se lee claramente terracota incluso en texto de 17px ("lejos" en Agitación).
3. (Aceptado como está) El número "72/100" grande vive dentro del SVG del mockup, no como HTML animable — se dejó así: es un mockup ilustrativo (Sesión 5 lo reemplaza por la app real), sobre-invertir en animar un número que de todas formas se va a reemplazar no es el mejor uso del tiempo de esta sesión.
4. `CtaButton` ahora also atenúa opacidad al tap (`whileTap: {scale 0.97, opacity 0.85}`) — feedback más visible en conexiones lentas, sin construir un estado de carga completo (se deja para Sesión 7, Pulido/Performance).
5. Cards de contraste "Hoy / En 6 meses" (`Agitacion.tsx`) ahora llevan `shadow-[var(--shadow-1)]` — antes eran las únicas superficies sin sombra de la página.

## AJUSTES POST-APROBACIÓN (pedido directo del dueño del producto, 2026-09-04)

La landing ya estaba LISTA (6ª ronda); estos cambios son gusto/preferencia del usuario, no defectos del revisor:
1. **Dispositivo ownable (subrayado marcador) ELIMINADO por completo.** Al usuario no le gustó ni siquiera en su versión más sutil (probamos 58%→22% de mezcla primero). `<Accent>` en `ui.tsx` ahora solo pinta el texto en `--accent` (verde), sin franja de fondo. Esto afecta el REGISTRO ANTI-REPETICIÓN de FICHA-ARTE.md (el "dispositivo ownable" documentado ahí ya no aplica — pendiente de revisar si se define uno nuevo en una sesión futura, o si el proyecto sigue sin dispositivo ownable).
2. **Copy recortado en toda la página** ("menos texto, más fácil de leer a golpe de vista"): Hero (subtítulo), Agitación (3 frases + contraste), Solución (Big Idea + 2 de los 3 pasos), Garantía (condición), las 6 respuestas de FAQ, y CTA Final (future pacing + PS). Ningún corte cambia el significado ni quita una objeción de la ficha — solo se acortan las frases. Los conteos de palabras siguen dentro de los presupuestos de 52 (verificado: cero warnings de `warnCopy` en consola tras el cambio).

