# VEREDICTO revisor-visual — landing
Fecha: 2026-09-05 00:00
Screenshot: C:\Users\juan9\CLAUDE\CLAUDE\speakfast\audit8\s00.png (+ s01..s10, scroll completo 375px)
Usabilidad: 29/40
Craft: 12/20
Copy (si vende): 18/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [Identidad] Paleta crema+verde+Fraunces/Figtree funciona pero es intercambiable con cualquier app de bienestar/educación estilo Headspace/Duolingo; el único toque ownable (filo terracota) vive escondido en el chip de ícono de Garantía, una sola vez en todo el scroll. Fix: sumar la nota terracota en 1-2 puntos más de alto tráfico visual (ej. borde del badge "MÁS POPULAR" o un acento en el mockup del hero) para que se registre antes de llegar a Garantía.
2. [Hero, visual del mockup] El número "72/100" aparece DOS veces seguidas: grande y estático dentro del SVG del mockup, y chico (17px) animado con CountUpNumber en la leyenda de abajo — la única instancia que realmente cuenta en vivo no es el número héroe real, sino su duplicado. Fix: mover el conteo animado al número grande real (componente vivo, no imagen) o eliminar la leyenda duplicada.
3. [Oferta] El precio "$3.75/mes (se cobra $44.99/año)" se repite en la nota del stack Hormozi y de inmediato otra vez en la card Anual, a menos de 2 scrolls de distancia — se siente redundante. Fix: en la nota del stack, resumir el ahorro ("Ahorras $199/año") sin repetir el precio exacto que ya muestra la card de abajo.
4. [Oferta, plan Mensual] El texto del CTA "Empezar con el plan mensual" envuelve a 2 líneas mientras el CTA Anual ("Empezar mis 7 días gratis") queda en 1 línea — las alturas de ambos botones no calzan entre sí en pantallas adyacentes. Fix: acortar el label mensual a algo que quepa en 1 línea a 375px (ej. "Elegir el plan mensual").
5. [Copy, sección Oferta] "Banco de preguntas de tu rol (Tech, Marketing, Ventas, Finanzas)" mezcla "Tech" en inglés crudo dentro de una lista en español — rompe la regla de 0 inglés no traducido en la UI. Fix: usar "Tecnología" o el nombre de rol equivalente en español.
