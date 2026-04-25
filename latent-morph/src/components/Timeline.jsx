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
  const progress = steps > 0 ? (currentFrame / steps) * 100 : 0;

  return (
    <div className="glass-card-strong p-5 border-t border-outline/50">
      {/* Frame labels */}
      <div className="flex justify-between text-xs text-on-surface-variant mb-3">
        <span className="font-mono">Frame 000</span>
        <span className="font-mono">Frame {steps}</span>
      </div>

      {/* Scrubber */}
      <div className="relative mt-2 mb-4">
        <div className="h-2 bg-surface-variant rounded-full overflow-hidden">
          <div
            className="h-2 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Playhead */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-primary rounded-full shadow-lg"
          style={{ left: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <button 
            onClick={() => setFrame(0)}
            className="icon-btn"
            title="First frame"
          >
            <span className="material-symbols-outlined">skip_previous</span>
          </button>

          <button 
            onClick={isPlaying ? pause : play}
            className="icon-btn bg-primary/10 text-primary hover:bg-primary/20"
            title={isPlaying ? "Pause" : "Play"}
          >
            <span className="material-symbols-outlined">
              {isPlaying ? "pause" : "play_arrow"}
            </span>
          </button>

          <button 
            onClick={() => setFrame(steps)}
            className="icon-btn"
            title="Last frame"
          >
            <span className="material-symbols-outlined">skip_next</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs text-on-surface-variant">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">speed</span>
            {fps} FPS
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            {duration}s
          </span>
        </div>
      </div>
    </div>
  );
}