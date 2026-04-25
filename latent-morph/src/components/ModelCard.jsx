export default function ModelCard({ model, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`card cursor-pointer relative transition-all duration-200 hover-lift active-press ${
        selected
          ? "border-primary bg-primary/5 shadow-lg ring-1 ring-primary/20"
          : "hover:border-outline-variant"
      }`}
    >
      {/* Selected Indicator */}
      {selected && (
        <div className="absolute top-3 right-3">
          <span className="material-symbols-outlined text-primary text-[20px] animate-scale-in">
            check_circle
          </span>
        </div>
      )}

      {/* Content */}
      <h3 className="text-sm font-semibold text-on-surface mb-2">{model.name}</h3>
      <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">{model.desc}</p>
      
      <span className={`badge ${selected ? "badge-primary" : ""}`}>
        <span className="material-symbols-outlined text-[12px]">code</span>
        {model.type}
      </span>
    </div>
  );
}