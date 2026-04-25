export default function CanvasOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none">

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Crosshair */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-400/30"></div>
      <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gray-400/30"></div>

    </div>
  );
}