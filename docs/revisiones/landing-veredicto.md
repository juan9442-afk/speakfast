# VEREDICTO revisor-visual — landing
Fecha: 2026-09-04 15:30
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 36/40
Craft: 18/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): N-A
Veredicto: LISTA
Top defectos:
1. [ui.tsx → StickyCtaMobile, botón X] El descarte de la barra sticky no tiene forma de recuperarse en la misma sesión (`descartada` queda en `true` para siempre) → fix: resetear `descartada` a `false` al entrar a #oferta o #cta-final, o no perder el acceso a precios tras un tap accidental.
2. [Oferta.tsx / Hero.tsx / CtaFinal.tsx, labels de CTA] El verbo de los 3 CTA de compra varía ("Probar mi primera simulación" / "Empezar mis 7 días gratis" / "Elegir mensual") → unificar la raíz del verbo entre los 3 para reforzar que es LA MISMA acción repetida.
3. [Oferta.tsx, card Anual] Doble badge simultáneo ("MÁS POPULAR" + "7 DÍAS GRATIS") sobre la misma card compite visualmente con el precio → fusionar en un solo mensaje o quitar uno.
4. [Evidencia] landing-375.png (full page) muestra huecos en blanco extensos entre secciones — artefacto de captura por scroll automatizado que no dispara el `whileInView` de cada sección a tiempo (las capturas 01-09 por sección confirman que el contenido SÍ renderiza completo) → recapturar el full-page con scroll incremental para evidencia limpia en la próxima ronda.
5. [Evidencia] Todas las capturas muestran el indicador circular "N" de Next.js Dev Tools superpuesto → recapturar desde build de producción (`next build && next start`) para que la evidencia de QA no quede contaminada por chrome de desarrollo.
