// DATOS DE EJEMPLO de la app interna (Sesión 5). TODO esto se reemplaza por datos
// reales de Supabase en la Sesión 6 (ver ESTADO.md → "Servicios externos").
// Es una maqueta honesta: números plausibles y consistentes entre pantallas,
// nunca testimonios ni cifras de mercado inventadas.

export type EstadoPregunta = 'sin-practicar' | 'en-progreso' | 'dominada';

export interface PerfilMock {
  rol: string;
  plan: 'Anual' | 'Mensual';
  renuevaEl: string;
  ritmo: 'Ligero' | 'Estándar' | 'Intensivo';
  entrevistasHoy: number;
  entrevistasLimiteHoy: number;
  vozActiva: boolean;
  recordatoriosEmail: boolean;
}

export const PERFIL: PerfilMock = {
  rol: 'Frontend Developer',
  plan: 'Anual',
  renuevaEl: '4 de septiembre de 2027',
  ritmo: 'Estándar',
  entrevistasHoy: 1,
  entrevistasLimiteHoy: 3,
  vozActiva: true,
  recordatoriosEmail: true,
};

export const INDICE_PREPARACION = 41; // partió en 34 en el onboarding
export const RACHA_DIAS = 4;
export const META_HOY_HECHA = false;

// Fluidez de las últimas entrevistas (para la gráfica de tendencia).
export const FLUIDEZ_HISTORIAL = [52, 55, 54, 58, 61, 60, 66, 72];

export const MULETILLAS_SEMANA = { actual: 6, anterior: 9 };

export interface EntrevistaMock {
  id: string;
  fecha: string;
  fluidez: number;
  muletillas: number;
  pausaTraduccionS: number;
}

export const HISTORIAL_ENTREVISTAS: EntrevistaMock[] = [
  { id: 'e8', fecha: 'Hoy', fluidez: 72, muletillas: 6, pausaTraduccionS: 2.4 },
  { id: 'e7', fecha: 'Ayer', fluidez: 66, muletillas: 7, pausaTraduccionS: 2.9 },
  { id: 'e6', fecha: 'Hace 2 días', fluidez: 60, muletillas: 8, pausaTraduccionS: 3.1 },
  { id: 'e5', fecha: 'Hace 4 días', fluidez: 61, muletillas: 8, pausaTraduccionS: 3.3 },
  { id: 'e4', fecha: 'Hace 5 días', fluidez: 58, muletillas: 9, pausaTraduccionS: 3.6 },
];

export interface VocabUpgrade {
  basica: string;
  pro: string;
}

export const MI_DICCIONARIO: VocabUpgrade[] = [
  { basica: 'I made a website', pro: 'I architected a scalable web application' },
  { basica: 'it was hard', pro: 'it was a significant technical challenge' },
  { basica: 'I fixed the bug', pro: 'I diagnosed and resolved the root cause' },
  { basica: 'the team was good', pro: 'the team was highly collaborative and delivery-focused' },
  { basica: 'I helped a lot', pro: 'I drove the initiative end to end' },
];

export interface PreguntaClave {
  id: string;
  textoEn: string;
  estado: EstadoPregunta;
  mejorFluidez: number | null;
}

export const PREGUNTAS_CLAVE: PreguntaClave[] = [
  { id: 'q1', textoEn: 'Tell me about a challenging project you worked on recently.', estado: 'dominada', mejorFluidez: 84 },
  { id: 'q2', textoEn: 'How do you handle disagreements with a teammate?', estado: 'dominada', mejorFluidez: 79 },
  { id: 'q3', textoEn: 'Walk me through how you debug a production issue.', estado: 'en-progreso', mejorFluidez: 63 },
  { id: 'q4', textoEn: 'What is your experience with performance optimization?', estado: 'en-progreso', mejorFluidez: 58 },
  { id: 'q5', textoEn: 'Describe a time you had to learn a new technology fast.', estado: 'en-progreso', mejorFluidez: 55 },
  { id: 'q6', textoEn: 'How do you approach code reviews?', estado: 'sin-practicar', mejorFluidez: null },
  { id: 'q7', textoEn: 'Tell me about a mistake you made and what you learned.', estado: 'sin-practicar', mejorFluidez: null },
  { id: 'q8', textoEn: 'Why do you want to work remotely for a US company?', estado: 'sin-practicar', mejorFluidez: null },
  { id: 'q9', textoEn: 'How do you keep your skills up to date?', estado: 'sin-practicar', mejorFluidez: null },
  { id: 'q10', textoEn: 'Where do you see yourself in three years?', estado: 'sin-practicar', mejorFluidez: null },
];

// Preguntas que "Sarah" hace en una entrevista de muestra.
export const ENTREVISTA_PREGUNTAS: string[] = [
  'Tell me about a challenging project you worked on recently.',
  'How did you handle the hardest part of it?',
  'How do you approach disagreements with a teammate?',
  'Walk me through how you debug a production issue.',
  'Why do you want to work remotely for a company abroad?',
];

// La "chuleta" que deja una entrevista (frases anti-bloqueo + upgrades del día).
export const FRASES_ANTIBLOQUEO: string[] = [
  'That’s a great question — let me think for a second.',
  'To give you some context first…',
  'The short answer is X. Here’s why:',
  'Let me walk you through it step by step.',
  'I’d approach it in two parts.',
  'The key trade-off there was…',
];

export const UPGRADES_DE_HOY: VocabUpgrade[] = [
  { basica: 'I made a website for the challenge', pro: 'I architected a scalable web application for that challenge' },
  { basica: 'it was really difficult', pro: 'it was a demanding problem with tight constraints' },
];
