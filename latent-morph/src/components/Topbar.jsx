import { useMorphStore } from "../store/useMorphStore";
import JSZip from "jszip";

export default function Topbar() {

  const { frames, resetAll, labelStart, labelEnd } = useMorphStore();

  const downloadDataset = async () => {
    if (!frames || frames.length === 0) {
      alert("No frames available");
      return;
    }

    const zip = new JSZip();
    const folder = zip.folder("dataset");

    const labels = [];

    const promises = frames.map(async (frame, i) => {
      const res = await fetch(frame);
      const blob = await res.blob();

      const filename = `frame_${i}.png`;
      folder.file(filename, blob);

      const alpha = i / (frames.length - 1);

      let labelData = null;

      if (labelStart !== null && labelEnd !== null) {
        labelData = {
          [labelStart]: Number((1 - alpha).toFixed(3)),
          [labelEnd]: Number(alpha.toFixed(3)),
        };
      }

      labels.push({
        frame: filename,
        alpha: Number(alpha.toFixed(3)),
        relation:
          i === 0
            ? "source"
            : i === frames.length - 1
              ? "target"
              : "intermediate",
        label: labelData,
      });
    });

    await Promise.all(promises);

    zip.file("labels.json", JSON.stringify(labels, null, 2));

    const content = await zip.generateAsync({ type: "blob" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "dataset.zip";
    link.click();
  };

  return (
    <header className="flex justify-between items-center px-6 py-3 border-b border-[var(--color-outline)]-variant bg-[var(--color-surface)]-container-lowest sticky top-0 z-50">

      {/* Left - Brand */}
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-primary text-[24px]">
          scatter_plot
        </span>
        <span className="text-xl font-semibold tracking-tight">
          Latent Morph
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <div className="relative hidden md:flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-[var(--color-on-surface)]-variant text-[18px]">
            search
          </span>

          <input
            type="text"
            placeholder="Search parameters..."
            className="pl-10 pr-4 py-2 w-64 bg-white border border-[var(--color-outline)]-variant rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition"
          />
        </div>

        {/* Export Button */}
        <div className="flex gap-2">

          <button
            onClick={downloadDataset}
            disabled={!frames || frames.length === 0}
            className={`px-4 py-2 border rounded transition
    ${!frames || frames.length === 0
                ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-300"
                : "hover:bg-surface cursor-pointer"
              }
  `}
          >
            Export Dataset
          </button>


          <button
            onClick={resetAll}
            className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded hover:bg-red-50 text-red-500 transition"
          >
            <span className="material-symbols-outlined text-[18px]">
              restart_alt
            </span>
            Reset
          </button>

        </div>

        {/* Icons */}
        <div className="flex items-center gap-2 border-l pl-4">
          {["notifications", "settings", "help"].map((icon) => (
            <button
              key={icon}
              className="p-2 rounded hover:bg-[var(--color-surface)] transition"
            >
              <span className="material-symbols-outlined text-[20px]">
                {icon}
              </span>
            </button>
          ))}
        </div>

        {/* Profile */}
        <div className="w-8 h-8 rounded-full border overflow-hidden cursor-pointer">
          <img
            src="https://i.pravatar.cc/100"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}