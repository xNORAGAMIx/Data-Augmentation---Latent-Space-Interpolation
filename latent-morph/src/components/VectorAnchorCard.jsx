import { useRef, useEffect, useState } from "react";

export default function VectorAnchorCard({ label, image, setImage, id }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  // Handle file selection
  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("Selected file:", file); // Debug
    setImage(file); // ✅ store actual File object
  };

  // Generate preview safely
  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // Cleanup (VERY IMPORTANT)
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] uppercase text-[var(--color-on-surface)]-variant">
        {label}
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        className="aspect-square border-2 border-dashed border-[var(--color-outline)]-variant rounded cursor-pointer relative overflow-hidden group bg-[var(--color-surface)] flex items-center justify-center"
      >
        {/* Preview */}
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs text-gray-500">
            Select Image
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
          <span className="text-white text-sm">Upload</span>
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

      <span className="text-[10px] text-center text-gray-500">
        ID: {id || "NONE"}
      </span>
    </div>
  );
}