import { useMorphStore } from "../store/useMorphStore";
import { useEffect, useRef } from "react";
import CanvasOverlay from "./CanvasOverlay";

export default function Canvas() {
  const { frames, currentFrame, isPlaying, fps, reset, nextFrame } = useMorphStore();

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
    <div className="flex-1 bg-[var(--color-surface)]-container border rounded relative flex items-center justify-center">

      <CanvasOverlay />

      {frames.length > 0 ? (
        <img
          src={frames[currentFrame]}
          className="max-w-full max-h-full"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-center opacity-60">
          <span className="material-symbols-outlined text-[64px] text-outline-variant mb-3">
            animation
          </span>

          <p className="text-sm text-on-surface-variant">
            Awaiting Execution Parameters
          </p>

          <p className="text-xs text-on-surface-variant mt-1">
            Upload images and generate morph
          </p>
        </div>
      )}
    </div>
  );
}

