import { useRef, useEffect, useState } from "react";

export default function VectorAnchorCard({ label, image, setImage, id }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  // Handle file selection
  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("Selected file:", file);
    setImage(file);
  };

  // Generate preview safely
  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // Cleanup
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] uppercase tracking-wider text-on-surface-variant font-medium">
        {label}
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        className="aspect-square border-2 border-dashed border-outline-variant rounded-xl cursor-pointer relative overflow-hidden group bg-surface hover:border-primary/50 transition-all duration-200 flex items-center justify-center"
      >
        {/* Preview */}
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-on-surface-variant/40 text-[32px]">
              add_photo_alternate
            </span>
            <span className="text-xs text-on-surface-variant/60">
              Select Image
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
          <span className="text-white text-sm font-medium">Upload</span>
        </div>

        {/* Hidden input */}
        <input
          type="file"
          ref={inputRef}
          onChange={handleUpload}
          accept="image/*"
          className="hidden"
        />
      </div>

      <span className="text-[10px] text-center text-on-surface-variant/60 font-mono">
        ID: {id || "NONE"}
      </span>
    </div>
  );
}