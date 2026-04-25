export default function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-on-surface-variant font-medium mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-on-surface">{value}</p>
    </div>
  );
}