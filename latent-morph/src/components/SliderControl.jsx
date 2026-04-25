import { useMorphStore } from "../store/useMorphStore";

export default function SliderControl({ value, setValue }) {
  const { frames } = useMorphStore();
  const isDisabled = frames.length !== 0;
  const percentage = (value / 128) * 100;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-on-surface">Transition Steps</span>
        <span className="badge badge-primary">
          {value}
        </span>
      </div>

      <div className="relative h-2 bg-surface-variant rounded-full overflow-hidden">
        {/* Filled track */}
        <div
          className={`absolute h-full rounded-full transition-all duration-200 ${
            isDisabled ? "bg-outline-variant" : "bg-gradient-to-r from-primary to-accent"
          }`}
          style={{ width: `${percentage}%` }}
        />

        {/* Range input */}
        <input
          type="range"
          min="10"
          max="128"
          value={value}
          disabled={isDisabled}
          onChange={(e) => setValue(Number(e.target.value))}
          className="absolute w-full h-2 opacity-0 cursor-pointer"
        />

        {/* Thumb indicator */}
        <div
          className={`absolute w-4 h-4 bg-white border-2 rounded-full top-1/2 -translate-y-1/2 shadow-md transition-all duration-200 ${
            isDisabled ? "border-outline-variant" : "border-primary"
          }`}
          style={{ left: `${percentage}%`, transform: "translate(-50%, -50%)" }}
        />
      </div>
      
      <div className="flex justify-between text-[11px] text-on-surface-variant/70">
        <span>10</span>
        <span>128</span>
      </div>
    </div>
  );
}