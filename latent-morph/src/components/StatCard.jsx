export default function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <span className="text-xs text-on-surface-variant font-medium">{title}</span>
      <span className="text-2xl font-bold text-on-surface mt-1 block">{value}</span>
    </div>
  );
}