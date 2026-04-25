export default function CanvasOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Crosshair - gradient lines */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
    </div>
  );
}