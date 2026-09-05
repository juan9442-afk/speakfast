import type { Metadata } from "next";
import { EntrarScreen } from "./EntrarScreen";

export const metadata: Metadata = {
  title: "Entrar — SpeakFast",
};

export default function EntrarPage() {
  return <EntrarScreen />;
}
