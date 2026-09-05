# FICHA DE DIRECCIÓN DE ARTE — SpeakFast

Nombre de la dirección: **"El entrenador editorial"** (combinación A + F, ajustada — 2026-09-04, APROBADA por el usuario)

## Referencia del usuario (CONTRATO)
- ¿Hay imagen(es) de referencia del usuario?: NO — el usuario pidió "una mezcla de las tres referencias del reporte" (Duolingo, Cal AI, Headspace), "serio pero no frío, que el cliente se sienta a gusto", y que la landing "no parezca anuncio de curso de trading".
- Extracción: N/A — sin imagen. Se derivó por FUSIÓN de líderes + protocolo A/B/C (2 rondas + combinación).
- Prohibiciones anti-IA que la referencia LEVANTA: ninguna. Se mantiene toda la capa anti-IA (sin neón, sin #000, sin glow regado, sin glass sobre contenido). Además, restricción explícita del usuario: la landing NO usa negro+dorado, mayúsculas gritonas ni cuentas regresivas falsas.

## Identidad derivada (FUSIÓN de líderes — 16 PASO 0.2bis — + banco 54)
- TABLA DE LÍDERES:
  - **Headspace** → calidez, fondo claro cálido, promesa clara y calmada, onboarding emocional → de aquí sale el crema `#FAF6EC` y el tono "te acompaño".
  - **Cal AI** → dato grande como protagonista, fricción mínima, resultado inmediato → de aquí el NÚMERO GIGANTE de fluidez en la pantalla de resultado.
  - **Duolingo** → hábito, racha, progreso visible, verde = "hecho/aprobado" → de aquí el verde `#1F7A5A` como color principal de progreso y el patrón de una sola familia tipográfica en varios pesos.
  - **Linear / Revolut** (gigantes admirados) → jerarquía por tamaño, cards con material, restricción cromática, numerales tabulares.
- Combinación tipográfica probada usada: fila "Educación adulta / profesional (upskilling)" del 29 (serif para "serio" + sans) → **Fraunces (display) + Figtree (body)**. Validada contra líderes: la lógica de "una serif cálida que respeta al adulto + sans friendly" es la del nicho educación-adulto; Fraunces está aún poco quemada (29). NO serif+serif (Figtree es sans neutra-friendly).
- Arquetipo: **Héroe** (retos, superación bajo presión — el framing del copy) con toque de **Sabio** (te corrige, te enseña) y **Cuidador** (calidez, "sin vergüenza"). Keywords: directo, exigente, cálido, en-tu-esquina, honesto.
- Mundo del sujeto (0.45): entrevista remota, videollamada, cronómetro de presión, "Let's switch to English", sala de simulación / sparring, coach de esquina, bitácora de entrenamiento, onda de voz, headset. → sesga hacia: número/cronómetro tratados como dato de precisión, lenguaje de "entrenamiento", terracota (calidez humana, cercano, LATAM — banco 54 dir. 7) como nota.
- Dirección del banco 54 usada para el DISPOSITIVO OWNABLE: ~~#1 "Editorial cálida" → subrayado marcador~~ **REVOCADO 2026-09-04** — al usuario no le gustó, ni siquiera en versión sutil, viéndolo ya construido; se quitó de toda la landing (queda solo el color de acento en la palabra clave, sin franja de fondo). El proyecto sigue sin dispositivo ownable de subrayado; queda el 2º gesto propio: **filo de terracota** de 4px en el recuadro del dato héroe (de la idea de "bloque de color" de la opción F, reducido a acento) — ese SÍ sigue vigente.

## Personalidad compilada (obligatoria — 11)
- 3 adjetivos de personalidad: **Directo · Exigente · En tu esquina** (coach que te corrige sin adornos pero está de tu lado; nunca animalito triste, nunca culpa).
- Compilación (tabla del 11): spring bounce **0.1** (SOLO en la celebración de "pregunta dominada" y hitos de racha 7/30/100) · duración base **280ms** · exclamaciones máx **1 por pantalla** (tono adulto, cero hype) · celebración nivel **contenido/medio** (sobrio, sin confeti infantil, sin mascota) · radio tendencial **18px**.

## Brand kit final (valores para globals.css / @theme)
- Fondo: `#FAF6EC` (crema cálido) · Superficie: `#FFFDF7` · Hundido: `#F2EBDA` · Texto 1º/2º: `#241F1A` / `#7C7568`
- Acento principal: `#1F7A5A` (verde "listo/aprobado") — SOLO en: botón primario (CTA), barra "listo para tu entrevista", deltas positivos ("bajaste de 8 a 6", "↑ 11 puntos"), estado "dominada", racha.
- 2ª nota: `#B5502F` (terracota) — porqué: calidez humana + energía + carácter LATAM sin leerse corporativo frío (banco 54 dir. 7); USO ESTRICTO como acento puntual: filo del recuadro del dato héroe, fondo de los chips de ícono (10-12%). ~~color del subrayado marcador~~ (revocado — ver Trazabilidad). NUNCA como bloque grande, barra de estado ni botón.
- Semánticos: éxito `#1F7A5A` (coincide con el acento — verde) · error `#B23B2E` (rojo lacre, con ícono siempre) · aviso `#C9821E` (ámbar)
- Display: **Fraunces** (opsz variable; pesos 500/600, titulares 600) · Body: **Figtree** (pesos 400/500/600/700) · Escala: display 46-58px (número héroe) / title 22-24px / body 15-16px / label 11-13px. Salto display↔body ≥3×. Tracking titulares −0.01 a −0.02em; labels/mayúsculas +0.05em.
- Radio: 18px cards · 13px botón · 12px chips de ícono. Profundidad: sombras suaves tintadas cálidas (2 capas: `0 1px 2px rgb(46 34 22 / .05)` + `0 14px 30px -16px rgb(46 34 22 / .2)`) — no bordes duros grises. Espaciado base: escala 4·8·12·16·24·32·48·64.
- Dispositivo ownable: ~~subrayado marcador (receta banco 54 dir. 1)~~ **REVOCADO 2026-09-04 a pedido del usuario** — queda solo **filo de terracota** en el recuadro del dato héroe (propio).
- Motion signature: easing `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out suave) · stagger 50-70ms de entrada · firma: los titulares entran con fade puro (sin translate), los números cuentan de 0 al valor y se detienen sin rebote, la barra de "listo" se llena al cargar, spring 0.1 SOLO al dominar una pregunta o hito de racha. `prefers-reduced-motion` siempre respetado.

## Trazabilidad y vetos
- Protocolo A/B/C: opción elegida = **combinación de A ("El entrenador claro") + F ("Editorial con bloque de color"), luego ajustada** (terracota reducida de protagonista a acento; verde de A como principal). Descartadas: B (oscuro/condensada/naranja "sparring"), C (claro frío/grotesca/teal "cabina"), D (bitácora azul tinta), E (consola de voz oscura/azul eléctrico), y las versiones no-ajustadas de la combinación. Páginas comparativas: `docs/revisiones/direcciones-abc.html` (ronda 1: A/B/C), `docs/revisiones/direcciones-abc-ronda2.html` (ronda 2: D/E/F), `docs/revisiones/direccion-elegida-combo-AF.html` (combinación final ajustada).
- Paleta derivada de: crema cálido de Headspace + verde-aprobado de Duolingo (tomados como lógica, no hex literal de marca) + terracota del banco 54 dir. 7 "Terracota mediterránea".
- Registro anti-repetición: paleta (claro cálido · acento verde `#1F7A5A` + nota terracota `#B5502F`) y par tipográfico (**Fraunces + Figtree**) quedan VETADOS para el próximo proyecto del SO.
- Modo (claro/oscuro) DERIVADO por: nicho educación adulta = sesiones de estudio, legibilidad, "día/papel/victoria visible"; claro es hoy más distintivo que oscuro (16 Regla 2); el usuario pidió explícitamente "no totalmente serio y frío". NO asumido.

## Idioma UI: español latino neutro (mono-idioma; contenido de práctica en inglés) · Fecha de cierre de la ficha: 2026-09-04 · Aprobada por el usuario: SÍ

## Ajuste post-aprobación (2026-09-04)
Con la landing ya construida y aprobada (Sesión 3), el usuario vio el subrayado marcador en pantalla y no le gustó — ni en su versión original (58% de mezcla) ni en una versión mucho más sutil (22%) que se probó primero. Se eliminó del todo (`Accent` en `ui.tsx` ahora es solo texto en color de acento, sin fondo). El proyecto queda SIN dispositivo ownable de tipo "subrayado"; si en una sesión futura se quiere uno nuevo, se vuelve a pasar por el banco 54 con el usuario.
