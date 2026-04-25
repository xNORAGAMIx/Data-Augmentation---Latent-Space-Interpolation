import { useMorphStore } from "../store/useMorphStore";
import VectorAnchorCard from "./VectorAnchorCard";
import SliderControl from "./SliderControl";
import { generateMorph } from "../api/morphApi";

export default function Controls() {
  const {
    source,
    setFrames,
    target,
    setSource,
    setTarget,
    steps,
    setSteps,
    selectedModel,
    setGif,
    setLoading,
    frames,
    labelStart,
    labelEnd,
    setLabelStart,
    setLabelEnd,
  } = useMorphStore();

  console.log(selectedModel);

  const handleGenerate = async () => {
    if (!source || !target) {
      alert("Upload both images");
      return;
    }

    try {
      setLoading(true);

      const result = await generateMorph({
        imgA: source,
        imgB: target,
        steps,
        selectedModel,
        fps: 24,
      });

      setFrames(result.frames);
      setGif(result.gif);
    } catch (err) {
      console.error(err);
      alert("Error generating morph");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = frames.length !== 0;

  return (
    <div className="w-[320px] flex flex-col gap-5 overflow-y-auto p-1">
      {/* Vector Anchors */}
      <div className={`glass-card p-5 space-y-4 ${isDisabled ? "opacity-50 pointer-events-none" : ""}`}>
        <h2 className="text-sm font-semibold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-primary">anchor</span>
          Vector Anchors
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <VectorAnchorCard
            label="Source (A)"
            image={source}
            setImage={setSource}
            id="VEC-8492"
          />
          <VectorAnchorCard
            label="Target (B)"
            image={target}
            setImage={setTarget}
          />
        </div>
      </div>

      {/* Slider */}
      <div className={`glass-card p-5 ${isDisabled ? "opacity-50 pointer-events-none" : ""}`}>
        <SliderControl value={steps} setValue={setSteps} />
      </div>

      {/* Labels */}
      <div className="glass-card p-5 space-y-4">
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-primary">label</span>
          Labels
          <span className="badge ml-auto">augmentation</span>
        </h2>

        <div className="flex gap-3">
          <input
            type="number"
            min="0"
            max="9"
            placeholder="Source label"
            value={labelStart ?? ""}
            onChange={(e) => setLabelStart(Number(e.target.value))}
            className="input-field"
          />
          <input
            type="number"
            min="0"
            max="9"
            placeholder="Target label"
            value={labelEnd ?? ""}
            onChange={(e) => setLabelEnd(Number(e.target.value))}
            className="input-field"
          />
        </div>

        <p className="text-[11px] text-on-surface-variant/70">
          Optional: enables soft-label dataset export
        </p>
      </div>

      {/* Generate Button */}
      <button 
        onClick={handleGenerate} 
        className="btn-primary w-full py-3 text-sm font-medium"
      >
        <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
        Generate Sequence
      </button>
    </div>
  );
}