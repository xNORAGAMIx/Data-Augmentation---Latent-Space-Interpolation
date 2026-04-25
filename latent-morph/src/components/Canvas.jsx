import { useMorphStore } from "../store/useMorphStore";
import { useEffect, useRef } from "react";
import CanvasOverlay from "./CanvasOverlay";

export default function Canvas() {
  const { frames, currentFrame, isPlaying, fps, nextFrame } = useMorphStore();

  const rafRef = useRef(null);

  useEffect(() => {
    if (!isPlaying || frames.length === 0) return;

    let lastTime = 0;

    const animate = (time) => {
      if (time - lastTime > 1000 / fps) {
        nextFrame();
        lastTime = time;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, fps, frames.length]);

  return (
    <div className="flex-1 bg-gradient-to-br from-surface-container to-surface border border-outline/50 rounded-xl relative flex items-center justify-center shadow-inner overflow-hidden">
      <CanvasOverlay />

      {frames.length > 0 ? (
        <img
          src={frames[currentFrame]}
          className="max-w-full max-h-full rounded-lg shadow-2xl object-contain animate-scale-in"
          alt={`Morph frame ${currentFrame}`}
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-center opacity-70 animate-fade-in-up">
          <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[64px] gradient-text opacity-40">
              animation
            </span>
          </div>
          <p className="text-sm font-medium text-on-surface-variant mb-1">
            Awaiting Execution Parameters
          </p>
          <p className="text-xs text-on-surface-variant/70">
            Upload images and generate morph
          </p>
        </div>
      )}
    </div>
  );
}