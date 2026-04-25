import { create } from "zustand";

export const useMorphStore = create((set, get) => ({
  source: null,
  target: null,
  steps: 50,

  isPlaying: false,
  currentFrame: 0,
  fps: 24,

  frames: [],
  gif: null,
  loading: false,

  setFrames: (frames) => set({ frames }),

  setSource: (file) => set({ source: file }),
  setTarget: (file) => set({ target: file }),

  setGif: (gif) => set({ gif }),
  setLoading: (loading) => set({ loading }),

  setSteps: (steps) => set({ steps }),

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),

  setFrame: (frame) => set({ currentFrame: frame }),

  nextFrame: () => {
    const { currentFrame, frames } = get();

    if (currentFrame < frames.length - 1) {
      set({ currentFrame: currentFrame + 1 });
    }
  },

  resetAll: () =>
    set({
      frames: [],
      gif: null,
      source: null,
      target: null,
      currentFrame: 0,
      isPlaying: false,
    }),

}));