export default function ToggleSwitch({ enabled, toggle, label }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-on-surface">{label}</span>

      <button
        onClick={toggle}
        role="switch"
        aria-checked={enabled}
        className={`w-11 h-6 flex items-center rounded-full p-0.5 cursor-pointer transition-all duration-200 ${
          enabled 
            ? "bg-gradient-to-r from-primary to-accent" 
            : "bg-outline-variant"
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}