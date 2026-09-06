// URL pública del sitio. En producción viene de NEXT_PUBLIC_SITE_URL (se fija en
// Vercel al conectar el dominio); mientras tanto, el dominio de Vercel.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://speakfast.vercel.app'
).replace(/\/$/, '');
