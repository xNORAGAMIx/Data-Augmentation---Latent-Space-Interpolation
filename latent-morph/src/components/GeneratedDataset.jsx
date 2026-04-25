import { useMorphStore } from "../store/useMorphStore";

export default function GeneratedDataset() {
  const { frames } = useMorphStore();

  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-outline-variant rounded-xl p-5 shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-semibold">
          Generated Dataset
        </h2>

        <span className="text-xs text-on-surface-variant">
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
          <span className="material-symbols-outlined text-[48px] mb-2">
            dataset
          </span>
          <p className="text-sm">No dataset generated yet</p>
          <p className="text-xs mt-1 text-on-surface-variant">
            Run a morph to generate samples
          </p>
        </div>
      ) : (
        <>
          {/* Grid */}
          <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-10 gap-3 max-h-72 overflow-y-auto pr-2">

            {frames.map((frame, i) => {
              const alpha = i / (frames.length - 1);

              let label = "Transition";
              if (i === 0) label = "Source";
              else if (i === frames.length - 1) label = "Target";

              return (
                <div
                  key={i}
                  className="relative group aspect-square border border-outline-variant rounded-md overflow-hidden bg-[var(--color-surface)] hover:shadow-md transition"
                >
                  {/* Image */}
                  <img
                    src={frame}
                    className="w-full h-full object-contain"
                  />

                  {/* Hover Info */}
                  <div className="absolute inset-0 bg-black/60 text-white text-[10px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <span>#{i}</span>
                    <span>α = {alpha.toFixed(2)}</span>
                    <span>{label}</span>
                  </div>
                </div>
              );
            })}

          </div>

          {/* Footer */}
          <div className="flex justify-between mt-4 text-xs text-on-surface-variant border-t border-outline-variant pt-3">
            <span>Resolution: 256×256</span>
            <span>Format: PNG</span>
          </div>

          <div className="mt-4 p-3 bg-gray-50 border rounded text-xs text-gray-600">
            These generated frames represent intermediate latent transitions between two digits.
            They can be used as synthetic data for training machine learning models,
            improving robustness and generalization.
          </div>
        </>
      )}
    </div>
  );
}