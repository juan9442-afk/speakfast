// Estado anónimo del onboarding — vive en localStorage VERSIONADO (26 §"usuario
// anónimo → cuenta"): sessionStorage se perdía al cerrar la pestaña entre el
// paywall, Hotmart, el correo y el login. `v` permite descartar formas viejas.

const KEY = 'sf_onboarding';
const PLAN_KEY = 'sf_selected_plan';
const DONE_KEY = 'sf_onboarding_migrado';
export const ONBOARDING_V = 1;

export interface OnboardingData {
  v: number;
  profesion: string | null;
  rol: string;
  meta: string | null;
  timing: string | null;
  dolores: string[];
  intensidad: string | null;
  indicePreparacion: number;
}

export function saveOnboarding(d: Omit<OnboardingData, 'v'>) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ v: ONBOARDING_V, ...d }));
  } catch {
    /* modo privado / storage lleno — no bloquea el flujo */
  }
}

export function readOnboarding(): OnboardingData | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as OnboardingData;
    if (parsed.v !== ONBOARDING_V) return null; // forma vieja: se ignora
    return parsed;
  } catch {
    return null;
  }
}

export function savePlan(plan: string) {
  try {
    localStorage.setItem(PLAN_KEY, plan);
  } catch {
    /* no bloquea */
  }
}

export function readPlan(): string | null {
  try {
    return localStorage.getItem(PLAN_KEY);
  } catch {
    return null;
  }
}

export function marcarMigrado() {
  try {
    localStorage.setItem(DONE_KEY, '1');
    localStorage.removeItem(KEY);
  } catch {
    /* no bloquea */
  }
}

export function yaMigrado(): boolean {
  try {
    return localStorage.getItem(DONE_KEY) === '1';
  } catch {
    return false;
  }
}
