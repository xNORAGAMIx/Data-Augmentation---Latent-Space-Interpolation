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
    <header className="glass-card-strong sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Left - Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <span className="material-symbols-outlined gradient-text text-[24px]">
              scatter_plot
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Latent Morph
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              placeholder="Search parameters..."
              className="search-input"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={downloadDataset}
              disabled={!frames || frames.length === 0}
              className="btn-secondary"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span className="hidden sm:inline">Export</span>
            </button>
            
            <button
              onClick={resetAll}
              className="btn-danger"
            >
              <span className="material-symbols-outlined text-[16px]">
                restart_alt
              </span>
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          {/* Icon Buttons */}
          <div className="hidden sm:flex items-center gap-1 border-l border-outline pl-4">
            {["notifications", "settings", "help"].map((icon) => (
              <button key={icon} className="icon-btn">
                <span className="material-symbols-outlined text-[20px]">
                  {icon}
                </span>
              </button>
            ))}
          </div>

          {/* Profile */}
          <div className="avatar">
            <img
              src="https://i.pravatar.cc/100"
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </header>
  );
}