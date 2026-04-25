import { useMorphStore } from "../store/useMorphStore";

export default function Timeline() {
  const {
    currentFrame,
    steps,
    setFrame,
    isPlaying,
    play,
    pause,
    fps,
  } = useMorphStore();

  const duration = (steps / fps).toFixed(2);

  return (
    <div className="p-4 border-t bg-[var(--color-surface)]-container-lowest">

      {/* Frame labels */}
      <div className="flex justify-between text-xs text-[var(--color-on-surface)]-variant">
        <span>Frame 000</span>
        <span>Frame {steps}</span>
      </div>

      {/* Scrubber */}
      <div className="relative mt-2 h-6">

        <div className="h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-[var(--color-primary)] rounded"
            style={{
              width: `${(currentFrame / steps) * 100}%`,
            }}
          />
        </div>

        {/* Playhead */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-[var(--color-primary)]"
          style={{
            left: `${(currentFrame / steps) * 100}%`,
          }}
        />
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">

        <div className="flex gap-2">
          <button onClick={() => setFrame(0)}>⏮</button>

          {isPlaying ? (
            <button onClick={pause}>⏸</button>
          ) : (
            <button onClick={play}>▶</button>
          )}

          <button onClick={() => setFrame(steps)}>⏭</button>
        </div>

        <div className="text-xs text-[var(--color-on-surface)]-variant">
          FPS: {fps} | Duration: {duration}s
        </div>
      </div>
    </div>
  );
}