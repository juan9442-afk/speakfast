import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones — SpeakFast",
};

export default function TerminosPage() {
  return (
    <main className="mx-auto w-full max-w-[720px] px-5 py-16 [font-family:var(--font-body)] text-[var(--text-primary)]">
      <a href="/" className="text-[14px] font-medium text-[var(--accent)]">
        ← Volver a SpeakFast
      </a>
      <h1 className="mt-6 text-[32px] font-bold [font-family:var(--font-display)]">
        Términos y Condiciones
      </h1>
      <p className="mt-2 text-[13px] text-[var(--text-tertiary)]">
        Última actualización: 4 de septiembre de 2026 (versión 1)
      </p>

      <div className="mt-8 flex flex-col gap-6 text-[15px] leading-relaxed text-[var(--text-secondary)]">
        <section>
          <h2 className="text-[18px] font-semibold text-[var(--text-primary)]">1. Qué es SpeakFast</h2>
          <p className="mt-2">
            SpeakFast es una herramienta de práctica para entrevistas de trabajo en inglés: simula
            preguntas reales bajo cronómetro y te da un análisis de fluidez, muletillas y ritmo
            generado por inteligencia artificial. <strong className="text-[var(--text-primary)]">No
            es un profesor certificado, ni un servicio de colocación laboral, ni garantiza que
            consigas una entrevista o un empleo.</strong>
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-[var(--text-primary)]">2. Tu cuenta y la suscripción</h2>
          <p className="mt-2">
            El acceso se vende como suscripción mensual o anual a través de Hotmart y se usa dentro
            de esta aplicación web. Tu suscripción <strong className="text-[var(--text-primary)]">se
            renueva automáticamente</strong> al finalizar cada período, al precio vigente en el
            momento de la renovación, hasta que la canceles. Puedes cancelar en cualquier momento
            desde tu cuenta o directamente en el portal de compras de Hotmart — dejas de pagar en el
            siguiente ciclo y conservas el acceso hasta el final del período ya pagado.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-[var(--text-primary)]">3. Uso aceptable</h2>
          <p className="mt-2">
            La cuenta es personal e intransferible. Podemos suspender el acceso si detectamos abuso
            del sistema (por ejemplo, automatizar simulaciones para agotar el servicio) o uso
            fraudulento del pago.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-[var(--text-primary)]">4. Límites de responsabilidad</h2>
          <p className="mt-2">
            El análisis que recibes es <strong className="text-[var(--text-primary)]">orientación
            generada por inteligencia artificial, no una evaluación profesional certificada</strong>.
            Puede contener errores o imprecisiones. La decisión de cómo prepararte para tu entrevista,
            y el resultado de esa entrevista, son responsabilidad tuya. Ver el{" "}
            <a href="/aviso-ia" className="text-[var(--accent)] underline">
              Aviso de IA
            </a>{" "}
            para el detalle completo.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-[var(--text-primary)]">5. Ley aplicable</h2>
          <p className="mt-2">
            Estos términos se rigen por las leyes de [PAÍS DESDE EL QUE OPERA EL RESPONSABLE —
            pendiente]. Cualquier disputa se resuelve ante los tribunales competentes de ese país,
            salvo que la ley de tu país de residencia te otorgue derechos irrenunciables como
            consumidor.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-[var(--text-primary)]">6. Contacto</h2>
          <p className="mt-2">
            <a href="mailto:soporte@speakfast.app" className="text-[var(--accent)] underline">
              soporte@speakfast.app
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
