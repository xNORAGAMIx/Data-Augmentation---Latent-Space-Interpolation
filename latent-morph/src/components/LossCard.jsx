export default function LossCard({ title, desc, detail, color }) {
  return (
    <div className="bg-white border rounded p-4 flex flex-col gap-2 hover:shadow-md transition">

      <h3 className="text-sm font-semibold">{title}</h3>

      <p className="text-xs text-gray-500">{desc}</p>

      <p className="text-xs text-gray-600 mt-2">
        {detail}
      </p>

    </div>
  );
}