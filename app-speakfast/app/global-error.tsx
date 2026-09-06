'use client';

// Último recurso: si falla el propio root layout. Debe traer su <html>/<body>
// y NO puede depender de globals.css/tokens (el layout que los carga es el que
// falló) — por eso hex literales, igual que app/icon.svg. Son los valores
// exactos de tokens.css: bg #F3ECDA, text #241F1A/#665F52, accent #1F7A5A, surface #FFFDF7.

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="es">
      <body
        style={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          padding: 24,
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif',
          background: '#F3ECDA',
          color: '#241F1A',
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Algo se rompió</h1>
        <p style={{ fontSize: 15, color: '#665F52', maxWidth: '36ch' }}>
          Recarga la página. Si sigue igual, inténtalo en un rato.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            height: 48,
            padding: '0 24px',
            borderRadius: 13,
            border: 'none',
            background: '#1F7A5A',
            color: '#FFFDF7',
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          Reintentar
        </button>
      </body>
    </html>
  );
}
