export default function ModelCard({ model, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`border rounded p-4 cursor-pointer transition ${
        selected
          ? "border-primary bg-primary/5 shadow"
          : "hover:bg-gray-50"
      }`}
    >
      <h3 className="text-sm font-semibold">{model.name}</h3>
      <p className="text-xs text-gray-500 mt-1">
        {model.desc}
      </p>

      <span className="text-[10px] mt-2 inline-block px-2 py-1 bg-gray-100 rounded">
        {model.type}
      </span>
    </div>
  );
}