'use client';

// template.tsx (no layout.tsx) para que CADA cambio de pestaña re-monte y anime
// una transición suave — el corte seco entre pestañas se veía barato (revisor S5).

import { motion, useReducedMotion } from 'motion/react';

export default function TabsTemplate({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.15 : 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
