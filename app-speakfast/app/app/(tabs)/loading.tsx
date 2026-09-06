// Skeleton mientras carga una pestaña (nunca spinner suelto — 15).

export default function TabsLoading() {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-[480px] animate-pulse px-4 pb-28 pt-4">
      <div className="h-7 w-40 rounded-[var(--radius-button)] bg-[color-mix(in_oklab,var(--text-tertiary)_16%,transparent)]" />
      <div className="mt-2 h-4 w-56 rounded-[var(--radius-button)] bg-[color-mix(in_oklab,var(--text-tertiary)_12%,transparent)]" />
      <div className="mt-6 h-40 rounded-[var(--radius-card)] bg-[color-mix(in_oklab,var(--text-tertiary)_12%,transparent)]" />
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="h-24 rounded-[var(--radius-card)] bg-[color-mix(in_oklab,var(--text-tertiary)_12%,transparent)]" />
        <div className="h-24 rounded-[var(--radius-card)] bg-[color-mix(in_oklab,var(--text-tertiary)_12%,transparent)]" />
      </div>
      <div className="mt-4 h-32 rounded-[var(--radius-card)] bg-[color-mix(in_oklab,var(--text-tertiary)_12%,transparent)]" />
    </div>
  );
}
