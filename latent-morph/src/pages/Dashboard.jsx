import { useMorphStore } from "../store/useMorphStore";
import StatCard from "../components/StatCard";
import InfoItem from "../components/InfoItem";
import EmptyState from "../components/EmptyState";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Dashboard() {
  const { frames, steps, fps } = useMorphStore();

  return (
    <div className="flex h-screen bg-[var(--color-surface)] text-[var(--color-on-surface)]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex flex-col flex-1 ml-64">

        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <div className="p-6 flex flex-col gap-6 overflow-y-auto">

          {/* Title */}
          <h1 className="text-2xl font-semibold tracking-tight">
            Dashboard
          </h1>

          {/* ===== STATS ===== */}
          <div className="grid grid-cols-3 gap-3">
            <StatCard title="Frames Generated" value={frames.length || 0} />
            <StatCard title="Steps Used" value={steps} />
            <StatCard title="Playback FPS" value={fps} />
          </div>

          {/* ===== MAIN GRID ===== */}
          <div className="grid grid-cols-3 gap-6">

            {/* Recent Morph */}
            <div className="col-span-2 bg-white border rounded p-4">
              <h2 className="text-sm font-semibold mb-4">
                Recent Morph Preview
              </h2>

              <div className="flex items-center justify-center h-64 bg-gray-50 rounded">
                {frames.length > 0 ? (
                  <img
                    src={frames[frames.length - 1]}
                    className="max-h-full"
                  />
                ) : (
                  <EmptyState text="No morph generated yet" />
                )}
              </div>
            </div>

            {/* Info Panel */}
            <div className="bg-white border rounded p-4 flex flex-col gap-3">
              <h2 className="text-sm font-semibold">
                System Info
              </h2>

              <InfoItem label="Model" value="ConvVAE64" />
              <InfoItem label="Device" value="CPU" />
              <InfoItem label="Interpolation" value="Slerp" />
              <InfoItem label="Resolution" value="256x256" />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}