"use client";

// 'use client' porque esta página pasa íconos de Lucide (componentes de función) como
// props a <Problema> — cruzar la frontera server→client de RSC con una función requiere
// que el padre también sea client component (mismo patrón que el kit EJEMPLO-page.tsx).

import { CloudFog, MessageCircleWarning, Repeat, TrendingDown } from "lucide-react";
import { Hero } from "@/components/landing/Hero";
import { Problema } from "@/components/landing/Problema";
import { Agitacion } from "@/components/landing/Agitacion";
import { Solucion } from "@/components/landing/Solucion";
import { AppPorDentro } from "@/components/landing/AppPorDentro";
import { Oferta } from "@/components/landing/Oferta";
import { Garantia } from "@/components/landing/Garantia";
import { Faq } from "@/components/landing/Faq";
import { CtaFinal } from "@/components/landing/CtaFinal";
import { FooterLegal } from "@/components/landing/FooterLegal";
import { StickyCtaMobile } from "@/components/landing/ui";
import { HeroDemo } from "@/components/landing/HeroDemo";

// Modelo 2 anónimo (onboarding-first, default B2C de 02C — ver ESTADO.md):
// el CTA lleva directo a /onboarding, sin registro previo. El checkout de
// Hotmart aparece después, en el paywall in-app (Sesión 4).
const CTA_HREF = "/onboarding";
// Un solo verbo raíz ("Empezar") en TODOS los CTA de compra del scroll (52/19):
// evita que "Probar/Empezar/Elegir" convivan como si fueran 3 acciones distintas.
const CTA_LABEL = "Empezar mi primera simulación";

export default function LandingSpeakFast() {
  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      {/* 1. HERO */}
      <Hero
        appName="SpeakFast"
        loginHref="/entrar"
        h1Marked="Entiendes inglés. Te [acento]congelas[/acento] en la entrevista."
        subtitleMarked="El [b]Simulacro de Presión[/b]: una entrevista completa, con voz y cronómetro."
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
        socialProof={<span>Garantía Hotmart de 15 días — sin preguntas</span>}
        visual={<HeroDemo />}
        visualPlaceholderSugerencia="captura de la pantalla de resultado con tu puntaje de fluidez y las muletillas detectadas"
      />

      {/* 2. PROBLEMA */}
      <Problema
        titulo="¿Te suena?"
        preguntas={[
          { icon: CloudFog, textoMarked: "¿Se te congela la mente al oír 'Let's switch to English'?" },
          { icon: Repeat, textoMarked: "¿Traduces cada frase en tu cabeza antes de responder?" },
          { icon: MessageCircleWarning, textoMarked: "¿Llenas los silencios con 'ehm' y 'like' sin darte cuenta?" },
          { icon: TrendingDown, textoMarked: "¿Ves a otros con menos nivel técnico conseguir el puesto remoto?" },
        ]}
      />

      {/* 3. AGITACIÓN — mismo fondo elevado que 2 */}
      <Agitacion
        frases={[
          "El espejo y la gramática no entrenan la presión real.",
          "Cada mes igual, tu sueldo se queda [acento]lejos[/acento] de lo remoto.",
          "En un año, son [b]12 meses más[/b] estancado.",
        ]}
        contraste={{
          labelHoy: "Hoy",
          hoy: "Ganas en tu moneda local; lo remoto paga en dólares.",
          labelFuturo: "En 6 meses, si nada cambia",
          futuro: "Sigues postulando, sigues congelándote, sigues igual.",
        }}
      />

      {/* 4. SOLUCIÓN — el mecanismo bautizado */}
      <Solucion
        tituloMarked="Entrena la presión [acento]antes de vivirla[/acento]"
        mecanismo="el Simulacro de Presión"
        bigIdeaMarked="No te falta vocabulario — te falta entrenar bajo presión real. El Simulacro de Presión [b]te entrevista hoy[/b], con las preguntas de tu rol."
        pasos={[
          { titulo: "Eliges tu rol", detalle: "Frontend, marketing, ventas — preguntas de tu profesión." },
          { titulo: "Una voz te entrevista", detalle: "4 a 6 preguntas seguidas, con cronómetro — como el día real." },
          { titulo: "Sales con tu chuleta", detalle: "Fluidez, muletillas y tus frases anti-bloqueo, listas para usar." },
        ]}
        antesDespues={{
          labelAntes: "Antes",
          antes: "Te congelas, traduces, dices 'ehm' seis veces por respuesta.",
          labelDespues: "Después",
          despues: "Respondes en automático, sin traducir, con dos muletillas menos.",
        }}
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
      />

      {/* 5. LA APP POR DENTRO — placeholders honestos (app interna: Sesión 5) */}
      <AppPorDentro
        tituloMarked="Así se ve tu [acento]Simulacro de Presión[/acento]"
        frames={[
          { src: "/mockups/onboarding.svg", label: "Elige tu rol y cuándo es tu entrevista", nombrePantalla: "Onboarding" },
          { src: "/mockups/simulacion.svg", label: "Una voz te entrevista, pregunta tras pregunta", nombrePantalla: "Simulación" },
          { src: "/mockups/resultado.svg", label: "Tu puntaje + tu chuleta de frases para el día real", nombrePantalla: "Resultado" },
          { src: "/mockups/progreso.svg", label: "Tu Índice de Preparación, día a día", nombrePantalla: "Mi progreso" },
        ]}
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
      />

      {/* 6. OFERTA — anual primero, trial 7 días en ambas, total visible (FICHA-MERCADO) */}
      <Oferta
        tituloMarked="Empieza gratis. Sigue por [acento]$0.12 al día[/acento]"
        trialDias={7}
        stack={{
          lineas: [
            { resultado: "SpeakFast Pro con el Simulacro de Presión (12 meses)", valor: "$180" },
            { resultado: "Banco de preguntas de tu rol (Tecnología, Marketing, Ventas, Finanzas)", valor: "$37" },
            { resultado: "Kit de frases anti-bloqueo + tu chuleta para el día de la entrevista", valor: "$29" },
            { resultado: "Reporte de mejora y racha de entrenamiento", valor: "$27" },
          ],
          totalTachado: "$273",
          nota: "Ahorras $228 al año · Garantía de 15 días",
        }}
        garantiaTexto="15 días de garantía · cancelas cuando quieras"
        anual={{
          nombre: "Anual",
          badge: "MÁS POPULAR",
          precioMes: "$3.75",
          totalAnual: "Se cobra $44.99/año",
          ahorro: "4 meses gratis",
          descomposicionDia: "menos de $0.12 al día",
          ctaLabel: "Empezar mis 7 días gratis",
          ctaHref: `${CTA_HREF}?plan=anual`,
          features: [
            "Entrevistas completas de tu rol, todos los días",
            "Kit de frases anti-bloqueo + tu chuleta, cada vez",
            "Tu diccionario de 'sonar profesional' que crece contigo",
            "Índice de Preparación, historial y récords de fluidez",
          ],
        }}
        mensual={{
          nombre: "Mensual",
          precioMes: "$5.99",
          ctaLabel: "Empezar plan mensual",
          ctaHref: `${CTA_HREF}?plan=mensual`,
          features: [
            "Entrevistas completas de tu rol, todos los días",
            "Kit de frases anti-bloqueo + tu chuleta, cada vez",
            "Tu diccionario de 'sonar profesional' que crece contigo",
            "Cancelas cuando quieras",
          ],
        }}
      />

      {/* 7. GARANTÍA — 15 días (Hotmart no admite 7 con trial de 7: garantía > prueba) */}
      <Garantia
        nombre="la Garantía de tu Primera Mejora"
        condicionMarked="Si en 15 días no mejora tu fluidez, escribes un correo y [b]te devolvemos todo[/b]. Sin preguntas."
        pisoLegal="Respaldada por la garantía Hotmart de 15 días"
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
      />

      {/* 8. FAQ — las 6 objeciones reales de FICHA-AVATAR.md, en su orden de fuerza */}
      <Faq
        abiertoInicial={0}
        items={[
          {
            pregunta: "¿Puedo simplemente practicar frente al espejo, gratis?",
            respuestaMarked:
              "El espejo no corrige gramática ni muletillas. Y aquí [b]nadie te escucha[/b]: tu voz se borra al instante.",
          },
          {
            pregunta: "¿No es lo mismo que Duolingo o Elsa Speak?",
            respuestaMarked:
              "No. Ellas enseñan lecciones; SpeakFast [b]simula tu entrevista real bajo presión[/b], con preguntas de tu puesto.",
          },
          {
            pregunta: "¿Una IA puede simular la presión de un reclutador real?",
            respuestaMarked:
              "Una voz te hace [b]pregunta tras pregunta con cronómetro[/b] y marca tus silencios y muletillas — se siente como el día real.",
          },
          {
            pregunta: "¿Por qué cuesta tan poco comparado con un profesor?",
            respuestaMarked:
              "Un profesor cobra $15-20 la hora; tú pagas [b]$3.75/mes por práctica diaria[/b].",
          },
          {
            pregunta: "¿Es seguro pagar con mi tarjeta?",
            respuestaMarked:
              "Sí. Lo procesa [b]Hotmart[/b], con tarjeta, PayPal y métodos locales de tu país.",
          },
          {
            pregunta: "¿Por qué no practico gratis con ChatGPT o mi celular?",
            respuestaMarked:
              "Ninguno mide tu tiempo de respuesta ni marca cada muletilla — [b]el Simulacro sí[/b].",
          },
        ]}
      />

      {/* 9. CTA FINAL — invertido, mismo verbo del hero, PS al cierre */}
      <CtaFinal
        h2Marked="Vive la presión [acento]antes de la entrevista real[/acento]"
        futurePacingMarked="Una voz te entrevista pregunta tras pregunta — y sales con tu chuleta lista para el día real."
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
        recap="7 días gratis para probar · después, 15 días de Garantía de tu Primera Mejora"
        psMarked="PS: entrena bajo presión real antes de tu entrevista de verdad. Hoy empiezas con 7 días gratis; si sigues, quedas cubierto 15 días por la Garantía de tu Primera Mejora — tu voz nunca se guarda."
      />

      {/* 10. FOOTER LEGAL — todas las páginas enlazadas existen (47) */}
      <FooterLegal
        appName="SpeakFast"
        soporteEmail="soporte@speakfast.app"
        enlaces={[
          { label: "Privacidad", href: "/privacidad" },
          { label: "Términos y Condiciones", href: "/terminos" },
          { label: "Reembolsos", href: "/reembolsos" },
          { label: "Aviso de IA", href: "/aviso-ia" },
        ]}
      />

      {/* Transversal T2: sticky CTA mobile */}
      <StickyCtaMobile
        labelComercial={CTA_LABEL}
        href={CTA_HREF}
        extraHideIds={["mecanismo-cta", "apppordentro-cta", "garantia-cta"]}
      />
    </div>
  );
}
