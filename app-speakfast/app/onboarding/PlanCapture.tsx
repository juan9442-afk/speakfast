"use client";

import { useEffect } from "react";

// La landing manda el plan elegido como ?plan=anual|mensual (Oferta, app/page.tsx).
// El onboarding real (elegir rol, primera simulación) se construye en la Sesión 4:
// este stub solo GUARDA la elección para no perderla, sin construir el flujo todavía.
export function PlanCapture({ plan }: { plan?: string }) {
  useEffect(() => {
    if (plan === "anual" || plan === "mensual") {
      sessionStorage.setItem("sf_selected_plan", plan);
    }
  }, [plan]);
  return null;
}
