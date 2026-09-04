import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Reembolso — SpeakFast",
};

export default function ReembolsosPage() {
  return (
    <main className="mx-auto w-full max-w-[720px] px-5 py-16 [font-family:var(--font-body)] text-[var(--text-primary)]">
      <a href="/" className="text-[14px] font-medium text-[var(--accent)]">
        ← Volver a SpeakFast
      </a>
      <h1 className="mt-6 text-[32px] font-bold [font-family:var(--font-display)]">
        Política de Reembolso
      </h1>
      <p className="mt-2 text-[13px] text-[var(--text-tertiary)]">
        Última actualización: 4 de septiembre de 2026 (versión 1)
      </p>

      <div className="mt-8 flex flex-col gap-6 text-[15px] leading-relaxed text-[var(--text-secondary)]">
        <section>
          <h2 className="text-[18px] font-semibold text-[var(--text-primary)]">
            la Garantía de tu Primera Mejora
          </h2>
          <p className="mt-2">
            Tienes <strong className="text-[var(--text-primary)]">15 días desde tu compra</strong>{" "}
            para pedir la devolución completa de tu dinero, sin preguntas. Si en ese plazo el
            Simulacro de Presión no te muestra una mejora real en tu fluidez, escríbenos y te
            devolvemos todo.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-[var(--text-primary)]">Cómo pedir tu reembolso</h2>
          <ol className="mt-2 flex list-decimal flex-col gap-2 pl-5">
            <li>
              Entra a{" "}
              <a
                href="https://refund.hotmart.com/"
                className="text-[var(--accent)] underline"
              >
                refund.hotmart.com
              </a>{" "}
              (la plataforma que procesó tu pago) dentro de los 15 días de tu compra.
            </li>
            <li>Ingresa tu número de transacción y el correo con el que compraste.</li>
            <li>
              Hotmart nos notifica y tenemos 5 días para responder; si no respondemos a tiempo, el
              reembolso se procesa automáticamente.
            </li>
            <li>
              El dinero vuelve por el mismo medio de pago: hasta 30 días si pagaste por
              transferencia, hasta 90 días si pagaste con tarjeta (plazos de Hotmart).
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-[var(--text-primary)]">Qué pasa con tu acceso</h2>
          <p className="mt-2">
            Al confirmarse el reembolso, tu acceso a SpeakFast se cierra. Esta política es la misma
            que administra Hotmart como pasarela de pago — no ofrecemos condiciones distintas a las
            configuradas en tu compra.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-[var(--text-primary)]">Cómo cancelar tu suscripción</h2>
          <p className="mt-2">
            Cancelar es distinto de pedir un reembolso: cancelar detiene la próxima renovación pero
            conservas el acceso hasta el final del período ya pagado. Hazlo desde tu cuenta en
            SpeakFast (Ajustes → Suscripción) o directamente en el portal de compras de Hotmart, con
            el correo con el que compraste.
          </p>
        </section>
      </div>
    </main>
  );
}
