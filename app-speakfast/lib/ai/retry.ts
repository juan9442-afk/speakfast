import 'server-only';

// Resiliencia de las llamadas a IA (30 §RESILIENCIA). callWithRetry reintenta UNA
// llamada ante 429/5xx/timeout; el CircuitBreaker mira el patrón agregado y deja
// de martillar al proveedor si falla repetido. Ambos en memoria = mitigación por
// instancia; la protección global real es el kill-switch de presupuesto (budget.ts).

export async function callWithRetry<T>(fn: () => Promise<T>, max = 3): Promise<T> {
  for (let i = 0; i < max; i++) {
    try {
      return await fn();
    } catch (e) {
      const err = e as { status?: number; name?: string };
      const retriable = err.status === 429 || (err.status ?? 0) >= 500 || err.name === 'TimeoutError';
      if (!retriable || i === max - 1) throw e;
      await new Promise((r) => setTimeout(r, 2 ** i * 1000 + Math.random() * 300));
    }
  }
  throw new Error('unreachable');
}

class CircuitBreaker {
  private failures = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  private openedAt = 0;
  constructor(private threshold = 5, private cooldownMs = 30_000) {}

  async exec<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.openedAt < this.cooldownMs) throw new Error('circuit-open');
      this.state = 'half-open';
    }
    try {
      const out = await fn();
      this.failures = 0;
      this.state = 'closed';
      return out;
    } catch (e) {
      this.failures++;
      if (this.state === 'half-open' || this.failures >= this.threshold) {
        this.state = 'open';
        this.openedAt = Date.now();
      }
      throw e;
    }
  }
}

export const aiBreaker = new CircuitBreaker();
