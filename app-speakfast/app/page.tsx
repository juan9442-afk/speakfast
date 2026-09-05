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
import { CountUpNumber, StickyCtaMobile } from "@/components/landing/ui";

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
        subtitleMarked="El [b]Simulacro de Presión[/b]: tu entrevista real, con cronómetro."
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
        socialProof={<span>Garantía Hotmart de 15 días — sin preguntas</span>}
        visual={
          <div className="flex flex-col items-center gap-4 bg-[color-mix(in_oklab,var(--accent)_5%,var(--surface))] px-6 py-8">
            <img
              src="/mockups/resultado.svg"
              alt="Resultado de una simulación: 72/100 de fluidez, muletillas detectadas y palabras a corregir"
              width={250}
              height={542}
              className="h-auto w-[220px] rounded-[20px] border-[3px] shadow-[var(--shadow-2)]"
              style={{ borderColor: "color-mix(in oklab, var(--text-primary) 88%, var(--accent))" }}
            />
            <p className="text-[13px] text-[var(--text-secondary)]">
              Así se ve tu resultado:{" "}
              <span className="text-[17px] font-bold [font-family:var(--font-display)] text-[var(--text-primary)]">
                <CountUpNumber to={72} />
                /100
              </span>{" "}
              de fluidez
            </p>
          </div>
        }
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
        bigIdeaMarked="No te falta vocabulario — te falta entrenar bajo presión real. El Simulacro de Presión [b]te la pone hoy[/b], con las preguntas de tu rol."
        pasos={[
          { titulo: "Eliges tu rol", detalle: "Frontend, marketing, ventas — preguntas de tu profesión." },
          { titulo: "Respondes bajo cronómetro", detalle: "60 segundos, en voz alta — la presión real del reclutador." },
          { titulo: "Recibes tu puntaje", detalle: "Fluidez, muletillas y tu respuesta reescrita, en segundos." },
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
          { src: "/mockups/simulacion.svg", label: "Responde bajo presión, con cronómetro", nombrePantalla: "Simulación" },
          { src: "/mockups/resultado.svg", label: "Tu puntaje y tu respuesta reescrita", nombrePantalla: "Resultado" },
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
            { resultado: "Reporte de mejora y racha de entrenamiento", valor: "$27" },
          ],
          totalTachado: "$244",
          nota: "Ahorras $199 al año · Garantía de 15 días",
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
            "Simulaciones de tu rol, todos los días",
            "Tu Índice de Preparación siempre actualizado",
            "Historial y récords de tu fluidez",
            "Respuesta reescrita en cada simulación",
          ],
        }}
        mensual={{
          nombre: "Mensual",
          precioMes: "$5.99",
          ctaLabel: "Empezar plan mensual",
          ctaHref: `${CTA_HREF}?plan=mensual`,
          features: [
            "Simulaciones de tu rol, todos los días",
            "Tu Índice de Preparación siempre actualizado",
            "Historial y récords de tu fluidez",
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
              "El Simulacro pone cronómetro estricto y [b]marca tus silencios y muletillas[/b] — no solo transcribe.",
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
        futurePacingMarked="Te sientas, eliges tu rol, respondes bajo cronómetro — y en minutos sabes qué corregir."
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
