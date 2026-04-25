export default function ModelCard({ model, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`relative border rounded p-4 cursor-pointer transition-all duration-200
        ${
          selected
            ? "border-primary bg-primary/10 shadow-md scale-[1.02]"
            : "border-gray-200 hover:bg-gray-50"
        }
      `}
    >
      {/* Selected Indicator */}
      {selected && (
        <div className="absolute top-2 right-2">
          <span className="material-symbols-outlined text-primary text-[18px]">
            check_circle
          </span>
        </div>
      )}

      {/* Content */}
      <h3 className="text-sm font-semibold">{model.name}</h3>

      <p className="text-xs text-gray-500 mt-1">
        {model.desc}
      </p>

      <span
        className={`text-[10px] mt-3 inline-block px-2 py-1 rounded
          ${
            selected
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-600"
          }
        `}
      >
        {model.type}
      </span>
    </div>
  );
}