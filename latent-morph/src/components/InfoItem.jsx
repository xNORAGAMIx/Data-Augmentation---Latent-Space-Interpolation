export default function InfoItem({ label, value }) {
  return (
    <div className="flex justify-between items-center text-sm py-1">
      <span className="text-on-surface-variant">{label}</span>
      <span className="font-medium text-on-surface">{value}</span>
    </div>
  );
}