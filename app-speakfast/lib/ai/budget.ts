import 'server-only';

// Kill-switch de gasto de IA (30 §CIRCUIT-BREAKER DE GASTO). Dos ventanas: el
// tope DIARIO frena un pico/bug del día; el MENSUAL frena la sangría lenta.
// Lee de la tabla `ai_calls`. La CAPA 0 (tope duro en la consola de Anthropic/
// OpenAI) es la red final si este código falla — el usuario la activa al crear
// las cuentas.

import { createAdminClient } from '@/lib/supabase/admin';

const LIMITE_DIARIO_USD = Number(process.env.AI_DAILY_BUDGET_USD ?? 20);
const LIMITE_MENSUAL_USD = Number(process.env.AI_MONTHLY_BUDGET_USD ?? 200);

let cache: { at: number; diario: number; mensual: number } | null = null;

async function gastos() {
  if (cache && Date.now() - cache.at < 60_000) return cache;
  const admin = createAdminClient();
  const inicioDia = new Date();
  inicioDia.setUTCHours(0, 0, 0, 0);
  const inicioMes = new Date(Date.UTC(inicioDia.getUTCFullYear(), inicioDia.getUTCMonth(), 1));

  const { data } = await admin
    .from('ai_calls')
    .select('cost_usd, created_at')
    .gte('created_at', inicioMes.toISOString());

  let diario = 0;
  let mensual = 0;
  for (const row of data ?? []) {
    const c = Number(row.cost_usd) || 0;
    mensual += c;
    if (new Date(row.created_at as string) >= inicioDia) diario += c;
  }
  cache = { at: Date.now(), diario, mensual };
  return cache;
}

/** Llamar ANTES de cada generación cara. false → el handler degrada con gracia. */
export async function dentroDelPresupuesto(): Promise<boolean> {
  try {
    const g = await gastos();
    return g.diario < LIMITE_DIARIO_USD && g.mensual < LIMITE_MENSUAL_USD;
  } catch {
    // Si no podemos leer el gasto, NO bloqueamos (fail-open aquí es correcto: la
    // CAPA 0 del proveedor sigue protegiendo). Se registra igual abajo.
    return true;
  }
}

/** Registrar el costo real DESPUÉS de la llamada. Invalida el caché. */
export async function registrarLlamada(params: {
  userId?: string | null;
  kind: 'stt' | 'llm' | 'tts' | 'cheatsheet';
  model?: string;
  costUsd: number;
}) {
  cache = null;
  try {
    const admin = createAdminClient();
    await admin.from('ai_calls').insert({
      user_id: params.userId ?? null,
      kind: params.kind,
      model: params.model ?? null,
      cost_usd: Number(params.costUsd.toFixed(4)),
    });
  } catch {
    /* registrar el gasto no debe tumbar la respuesta al usuario */
  }
}
