import { useMorphStore } from "../store/useMorphStore";

export default function SliderControl({ value, setValue }) {
  const { frames } = useMorphStore();

  const percentage = (value / 128) * 100;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span>Transition Steps</span>
        <span className="px-2 border rounded text-primary">
          {value}
        </span>
      </div>

      <div className="relative h-2 bg-[var(--color-surface)]-variant rounded">
        <div
          className={`absolute h-full bg-[var(--color-primary)] rounded ${frames.length != 0
            ? "bg-gray-300"
            : "bg-[var(--color-primary)]"
            }`}
          style={{ width: `${percentage}%` }}
        />

        <input
          type="range"
          min="10"
          max="128"
          value={value}
          disabled={frames.length != 0}
          onChange={(e) => setValue(Number(e.target.value))}
          className={`absolute w-full h-2 opacity-0 ${frames.length != 0
            ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-300"
            : "hover:bg-surface cursor-pointer"
          }`}
        />

        <div
          className="absolute w-4 h-4 bg-white border-2 border-primary rounded-full top-1/2 -translate-y-1/2"
          style={{ left: `${percentage}%`, transform: "translate(-50%, -50%)" }}
        />
      </div>
    </div>
  );
}