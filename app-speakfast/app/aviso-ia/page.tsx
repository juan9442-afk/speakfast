import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso de IA — SpeakFast",
};

export default function AvisoIaPage() {
  return (
    <main className="mx-auto w-full max-w-[720px] px-5 py-16 [font-family:var(--font-body)] text-[var(--text-primary)]">
      <a href="/" className="text-[14px] font-medium text-[var(--accent)]">
        ← Volver a SpeakFast
      </a>
      <h1 className="mt-6 text-[32px] font-bold [font-family:var(--font-display)]">
        Aviso de Inteligencia Artificial
      </h1>
      <p className="mt-2 text-[13px] text-[var(--text-tertiary)]">
        Última actualización: 4 de septiembre de 2026 (versión 1)
      </p>

      <div className="mt-8 flex flex-col gap-6 text-[15px] leading-relaxed text-[var(--text-secondary)]">
        <section>
          <p>
            SpeakFast usa inteligencia artificial para transcribir tu voz y analizar tu fluidez,
            tus muletillas y tu ritmo al hablar.{" "}
            <strong className="text-[var(--text-primary)]">
              Esto es orientación de práctica generada por IA — no es una evaluación profesional
              certificada, ni consejo de un reclutador real, ni una garantía de que pasarás tu
              entrevista o conseguirás el empleo.
            </strong>
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-[var(--text-primary)]">Cómo funciona el análisis</h2>
          <p className="mt-2">
            Grabamos tu respuesta mientras dura la simulación. La grabación se envía a un proveedor
            de transcripción de voz para convertirla a texto; ese texto se analiza con un modelo de
            lenguaje que calcula tu puntaje de fluidez, detecta muletillas y sugiere una versión
            mejorada de tu respuesta. El resultado puede contener errores: la IA puede transcribir
            mal una palabra, calificar de forma imperfecta o no captar el contexto técnico de tu
            respuesta.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-[var(--text-primary)]">Tu voz nunca se guarda</h2>
          <p className="mt-2">
            El archivo de audio se usa solo para generar la transcripción y se{" "}
            <strong className="text-[var(--text-primary)]">borra de inmediato</strong> después. No
            almacenamos grabaciones de tu voz, no las reproducimos y no las compartimos.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-[var(--text-primary)]">La decisión es tuya</h2>
          <p className="mt-2">
            Usa el análisis como una guía de práctica, no como la última palabra. Para una
            preparación completa de una entrevista importante, complementa con la investigación de
            la empresa, el rol y, si puedes, la opinión de una persona real de tu confianza.
          </p>
        </section>
      </div>
    </main>
  );
}
