export default function MiniCard({ title, text }) {
  return (
    <div className="bg-white border rounded p-4 text-center">
      <h4 className="text-sm font-semibold mb-1">{title}</h4>
      <p className="text-xs text-gray-500">{text}</p>
    </div>
  );
}