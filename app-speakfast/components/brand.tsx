// LOGO DE SPEAKFAST — isotipo + wordmark. Derivado de FICHA-ARTE.md: el acento
// verde "listo/aprobado" como base, la 2ª nota cálida en el pico de la onda, la
// forma redondeada del brand kit, inclinación hacia adelante = velocidad.
// El isotipo es una onda de voz que ASCIENDE: hablar + mejorar bajo presión.
// (El favicon vive aparte en app/icon.svg con hex literales — se renderiza
// sin CSS y no puede usar tokens.)

import type { ReactNode } from 'react';

export function Isotipo({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="SpeakFast"
    >
      <rect width="32" height="32" rx="8" fill="var(--accent)" />
      <g transform="translate(1.6,0) skewX(-7)">
        <rect x="6" y="16" width="3.4" height="8" rx="1.7" fill="var(--surface)" />
        <rect x="11.3" y="13" width="3.4" height="11" rx="1.7" fill="var(--surface)" />
        <rect x="16.6" y="10" width="3.4" height="14" rx="1.7" fill="var(--surface)" />
        <rect
          x="21.9"
          y="6.5"
          width="3.4"
          height="17.5"
          rx="1.7"
          fill="color-mix(in oklab, var(--accent-2) 55%, white)"
        />
      </g>
    </svg>
  );
}

/** Logo completo: isotipo + "SpeakFast" en Fraunces. Para headers y footer. */
export function Logo({
  size = 20,
  textClass = 'text-[16px]',
}: {
  size?: number;
  textClass?: string;
}): ReactNode {
  return (
    <span className="inline-flex items-center gap-2 font-semibold text-[var(--text-primary)]">
      <Isotipo size={size} />
      <span className={`${textClass} [font-family:var(--font-display)]`}>SpeakFast</span>
    </span>
  );
}
