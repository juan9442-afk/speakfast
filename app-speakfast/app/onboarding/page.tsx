import type { Metadata } from "next";
import { OnboardingFlow } from "./OnboardingFlow";

export const metadata: Metadata = {
  title: "Onboarding — SpeakFast",
};

// El plan elegido en la landing (Oferta, ?plan=anual|mensual) se propaga aquí
// y OnboardingFlow lo guarda para que el paywall lo pre-seleccione.
export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;
  return <OnboardingFlow plan={plan} />;
}
