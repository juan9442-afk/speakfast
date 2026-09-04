import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad — SpeakFast",
};

export default function PrivacidadPage() {
  return (
    <main className="mx-auto w-full max-w-[720px] px-5 py-16 [font-family:var(--font-body)] text-[var(--text-primary)]">
      <a href="/" className="text-[14px] font-medium text-[var(--accent)]">
        ← Volver a SpeakFast
      </a>
      <h1 className="mt-6 text-[32px] font-bold [font-family:var(--font-display)]">
        Política de Privacidad
      </h1>
      <p className="mt-2 text-[13px] text-[var(--text-tertiary)]">
        Última actualización: 4 de septiembre de 2026 (versión 1)
      </p>

      <div className="mt-8 flex flex-col gap-6 text-[15px] leading-relaxed text-[var(--text-secondary)]">
        <section>
          <h2 className="text-[18px] font-semibold text-[var(--text-primary)]">1. Quiénes somos</h2>
          <p className="mt-2">
            SpeakFast es operado por [NOMBRE O RAZÓN SOCIAL DEL RESPONSABLE — pendiente], con
            domicilio en [PAÍS DESDE EL QUE OPERA — pendiente]. Para cualquier duda sobre tus datos,
            escribe a{" "}
            <a href="mailto:soporte@speakfast.app" className="text-[var(--accent)] underline">
              soporte@speakfast.app
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-[var(--text-primary)]">2. Qué datos recopilamos</h2>
          <ul className="mt-2 flex flex-col gap-2">
            <li>
              <strong className="text-[var(--text-primary)]">Datos de cuenta:</strong> el correo con el
              que compras en Hotmart (nos lo entrega Hotmart para crear tu acceso).
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Datos de práctica:</strong> el rol/profesión
              que eliges, la transcripción de tus respuestas (texto, no audio), tu puntaje de fluidez,
              muletillas detectadas y tu historial de simulaciones.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Tu voz:</strong> se graba solo mientras
              dura la simulación, se envía a nuestro proveedor de transcripción para convertirla a
              texto, y el archivo de audio <strong className="text-[var(--text-primary)]">se borra
              de inmediato</strong> — nunca se guarda, nunca se reproduce, nunca se comparte.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Datos de uso:</strong> qué pantallas
              visitas y cuándo, para saber si la app funciona (analítica de producto).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-[var(--text-primary)]">3. Con quién compartimos tus datos</h2>
          <p className="mt-2">Nunca vendemos tus datos. Los compartimos solo con quienes hacen posible el servicio:</p>
          <ul className="mt-2 flex flex-col gap-2">
            <li><strong className="text-[var(--text-primary)]">Hotmart</strong> — procesa tu pago y crea tu cuenta.</li>
            <li><strong className="text-[var(--text-primary)]">Supabase</strong> — guarda tu cuenta y tu historial de práctica.</li>
            <li><strong className="text-[var(--text-primary)]">Nuestro proveedor de transcripción y análisis de voz con IA</strong> — convierte tu voz a texto y analiza tu fluidez, en el momento; no reentrena modelos con tu voz.</li>
            <li><strong className="text-[var(--text-primary)]">Vercel</strong> — aloja la aplicación.</li>
            <li><strong className="text-[var(--text-primary)]">Resend</strong> — envía los correos de acceso y avisos de tu cuenta.</li>
          </ul>
          <p className="mt-2">
            Algunos de estos proveedores procesan datos fuera de tu país (transferencia
            internacional) bajo sus propias garantías de seguridad y contratos de protección de datos.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-[var(--text-primary)]">4. Cómo puedes eliminar tus datos</h2>
          <p className="mt-2">
            Escríbenos a{" "}
            <a href="mailto:soporte@speakfast.app" className="text-[var(--accent)] underline">
              soporte@speakfast.app
            </a>{" "}
            pidiendo la eliminación de tu cuenta. Borramos tu historial de práctica, tus datos de
            cuenta y cancelamos tu acceso en un plazo razonable. El audio de tus simulaciones ya
            está borrado desde el momento en que se generó tu resultado.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-[var(--text-primary)]">5. Cambios a esta política</h2>
          <p className="mt-2">
            Si hacemos un cambio importante, te avisamos por correo antes de que entre en vigencia.
            Esta página siempre muestra la fecha de la última actualización.
          </p>
        </section>
      </div>
    </main>
  );
}
