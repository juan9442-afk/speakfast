import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El overlay "N" de dev tools no existe en producción, pero tapaba contenido
  // real en las capturas a 375px usadas para el revisor-visual — se desactiva
  // para que las capturas de QA sean evidencia limpia.
  devIndicators: false,
};

export default nextConfig;
