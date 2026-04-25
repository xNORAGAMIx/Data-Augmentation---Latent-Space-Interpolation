export default function StatCard({ title, value }) {
  return (
    <div className="bg-white border rounded p-4 flex flex-col gap-1">
      <span className="text-xs text-gray-500">{title}</span>
      <span className="text-xl font-semibold">{value}</span>
    </div>
  );
}