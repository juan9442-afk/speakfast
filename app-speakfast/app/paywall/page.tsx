import type { Metadata } from "next";
import { PaywallScreen } from "./PaywallScreen";

export const metadata: Metadata = {
  title: "Elige tu plan — SpeakFast",
};

export default function PaywallPage() {
  return <PaywallScreen />;
}
