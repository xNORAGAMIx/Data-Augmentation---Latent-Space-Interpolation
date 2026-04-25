export default function ToggleSwitch({ enabled, toggle, label }) {
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>

      <div
        onClick={toggle}
        className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition ${
          enabled ? "bg-[var(--color-primary)]" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
            enabled ? "translate-x-5" : ""
          }`}
        />
      </div>
    </div>
  );
}