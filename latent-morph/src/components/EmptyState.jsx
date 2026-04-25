export default function EmptyState({ text }) {
  return (
    <div className="flex flex-col items-center justify-center text-center opacity-60 py-8">
      <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-3">
        <span className="material-symbols-outlined text-[32px] text-primary/40">
          image
        </span>
      </div>
      <p className="text-sm font-medium text-on-surface-variant">{text}</p>
    </div>
  );
}