export default function MiniCard({ title, text }) {
  return (
    <div className="card text-center py-4">
      <h4 className="text-sm font-semibold mb-1 text-on-surface">{title}</h4>
      <p className="text-xs text-on-surface-variant">{text}</p>
    </div>
  );
}