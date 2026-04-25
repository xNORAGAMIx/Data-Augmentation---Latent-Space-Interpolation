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
    frames
  } = useMorphStore();

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
        fps: 10,
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

  return (
    <div className="w-[320px] flex flex-col gap-4 overflow-y-auto">

      {/* Vector Anchors */}
      <div className={`bg-white border p-4 space-y-3 ${frames.length != 0
        ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-300"
        : "hover:bg-surface cursor-pointer"
        }`}>
        <h2 className="text-sm font-semibold">Vector Anchors</h2>

        <div className="grid grid-cols-2 gap-3">
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
      <div className={`bg-white border p-4 ${frames.length != 0
        ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-300"
        : "hover:bg-surface cursor-pointer"
        }`}>
        <SliderControl value={steps} setValue={setSteps} />
      </div>

      {/* Button */}
      <button onClick={handleGenerate} className="px-4 py-2 rounded bg-blue-400 text-black hover:bg-[var(--color-primary)]-container transition-all duration-200 active:scale-95">
        Generate Sequence
      </button>
    </div>
  );
}