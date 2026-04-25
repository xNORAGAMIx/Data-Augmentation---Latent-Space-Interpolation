import { useMorphStore } from "../store/useMorphStore";

export default function GeneratedDataset() {
  const { frames } = useMorphStore();

  return (
    <div className="card">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-primary">dataset</span>
          Generated Dataset
        </h2>
        <span className="badge">
          {frames?.length || 0} samples
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-on-surface-variant mb-4">
        These frames represent intermediate latent transitions and can be used as synthetic training data.
      </p>

      {/* EMPTY STATE */}
      {!frames || frames.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-center opacity-60">
          <span className="material-symbols-outlined text-[48px] mb-3 text-primary/30">
            dataset
          </span>
          <p className="text-sm font-medium">No dataset generated yet</p>
          <p className="text-xs mt-1 text-on-surface-variant">
            Run a morph to generate samples
          </p>
        </div>
      ) : (
        <>
          {/* Grid */}
          <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-10 gap-3 max-h-72 overflow-y-auto pr-2 stagger-children">
            {frames.map((frame, i) => {
              const alpha = i / (frames.length - 1);

              let label = "Transition";
              if (i === 0) label = "Source";
              else if (i === frames.length - 1) label = "Target";

              return (
                <div
                  key={i}
                  className="relative group aspect-square border border-outline rounded-lg overflow-hidden bg-surface hover:shadow-lg hover:border-primary/30 transition-all duration-200"
                >
                  {/* Image */}
                  <img
                    src={frame}
                    className="w-full h-full object-contain"
                    alt={`Frame ${i}`}
                  />

                  {/* Hover Info */}
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm text-white text-[10px] flex flex-col items-center justify-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <span className="font-mono font-medium">#{i}</span>
                    <span>α = {alpha.toFixed(2)}</span>
                    <span className="badge badge-primary">{label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex justify-between mt-4 text-xs text-on-surface-variant border-t border-outline pt-3">
            <span>Resolution: 256×256</span>
            <span>Format: PNG</span>
          </div>

          <div className="mt-4 p-3 bg-surface-variant border border-outline rounded-lg text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[14px] align-middle mr-1">info</span>
            These generated frames represent intermediate latent transitions between two digits.
            They can be used as synthetic data for training machine learning models,
            improving robustness and generalization.
          </div>
        </>
      )}
    </div>
  );
}