export default function EmptyState({ text }) {
  return (
    <div className="flex flex-col items-center justify-center text-center opacity-60">
      <span className="material-symbols-outlined text-[48px] mb-2">
        image
      </span>
      <p className="text-sm">{text}</p>
    </div>
  );
}