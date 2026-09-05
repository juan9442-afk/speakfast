# VEREDICTO revisor-visual — pantalla-principal (Practicar / /app)
Fecha: 2026-09-05 14:40
Screenshot: C:\Users\juan9\CLAUDE\CLAUDE\speakfast\qa-s5\01-practicar.png
Usabilidad: 29/40
Craft: 13/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

Detalle usabilidad: h1:3 h2:3 h3:3 h4:3 h5:3 h6:3 h7:3 h8:3 h9:2 h10:3
Detalle craft: jerarquia:3 profundidad:3 identidad:2 movimiento:2 encaje:3

Gate: falla ambos umbrales (≥36/40 usabilidad Y ≥16/20 craft).

Top defectos:
1. [tarjeta Indice de Preparacion / resultado 74-100] El unico dispositivo ownable que
   define FICHA-ARTE (filo de terracota 4px en el recuadro del dato heroe, lineas 19/32)
   NO esta implementado. El kit queda como "crema + serif + un verde", intercambiable con
   otra app editorial. Fix: agregar el filo/borde terracota de 4px al recuadro del dato
   heroe en /app y en la pantalla de resultado.
2. [toda la pantalla + flujo de entrevista] Faltan 4 de las 7 animaciones baseline: sin
   stagger de entrada en /app (la ficha pide 50-70ms), sin transicion entre pestañas
   (corte duro), sin transicion entre fases de la entrevista (swap seco), sin celebracion
   sobria en hitos de racha (7/30/100) ni al dominar pregunta (la ficha define spring 0.1).
   Fix: contenedor con stagger por tab, AnimatePresence entre fases, micro-celebracion al
   cerrar la meta del dia / hito de racha.
3. [CTA "Empezar entrevista" + bottom nav] El CTA se renderiza como <Link> (rama href de
   BotonAccion) SIN whileTap; solo transition-opacity. El boton principal de la pantalla
   del dinero no responde al toque; los items de la bottom-nav tampoco. Fix: aplicar
   whileTap scale 0.97 (o :active propio) tambien a la rama Link de BotonAccion.
4. [seccion "Tu meta de hoy" / stat "Entrevistas hoy 1/3"] page.tsx siempre muestra
   "Empezar entrevista" y enlaza a la entrevista aunque entrevistasHoy alcance el limite
   (no se verifica en codigo). Al llegar a 3/3 el usuario entra a una entrevista que no
   deberia poder hacer, sin mensaje. Fix: al tope del dia, transformar el CTA en aviso con
   valor ("Volviste a tu tope de hoy — vuelve mañana"), verificado antes de navegar.
5. [jerarquia tipografica de /app] Conviven ~7 tamaños (24 h1, 44 anillo, 22 stat, 16
   meta, 14 body, 13, 12) contra el maximo de 3 por pantalla; el h1 serif de 24px compite
   con el dato heroe. Fix: reducir a 3 tamaños de texto + el numero heroe; bajar el rol a
   ~20px o a label para que el 41% mande solo.

Notas de contexto (no deciden el veredicto, pero corregir):
- [Cuenta] El boton "Cerrar sesion" no tiene handler: elemento con apariencia interactiva
  que no hace nada (anti-patron regla 11).
- [Preguntas] Tocar cualquier pregunta enruta al mismo /app/entrevista generico; el
  comentario promete "una entrevista enfocada" que no ocurre.
- [Preguntas] La badge terracota "EN PROGRESO" se repite apilada en muchas tarjetas: la
  2a nota (terracota) se lee como color de estado general, contra el uso "solo acento
  puntual" de FICHA-ARTE linea 28.
- [flujo entrevista] La X sale al instante sin confirmacion y pierde el progreso de la
  entrevista cronometrada en silencio.
- [globals] --text-secondary #665f52 sobre --bg #f3ecda queda cerca del limite AA
  (~4.4-4.6:1); verificar con los hex finales en labels de 13px.
