'use client';

// Aviso discreto cuando se cae la conexión. La app no rompe: solo informa.

import { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export function OfflineBanner() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const set = () => setOffline(!navigator.onLine);
    set();
    window.addEventListener('online', set);
    window.addEventListener('offline', set);
    return () => {
      window.removeEventListener('online', set);
      window.removeEventListener('offline', set);
    };
  }, []);

  if (!offline) return null;
  return (
    <div
      role="status"
      className="fixed inset-x-0 top-0 z-50 mx-auto flex max-w-[480px] items-center justify-center gap-2 bg-[var(--text-primary)] px-4 py-2 text-[13px] font-semibold text-[var(--bg)]"
    >
      <WifiOff size={14} aria-hidden="true" />
      Sin conexión — algunos datos pueden no estar al día
    </div>
  );
}
