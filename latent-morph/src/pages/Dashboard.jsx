import { useMorphStore } from "../store/useMorphStore";
import StatCard from "../components/StatCard";
import InfoItem from "../components/InfoItem";
import EmptyState from "../components/EmptyState";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Dashboard() {
  const { frames, steps, fps } = useMorphStore();

  return (
    <div className="flex h-screen bg-surface-container text-on-surface">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex flex-col flex-1 ml-64">

        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <main className="p-6 flex flex-col gap-6 overflow-y-auto">
          
          {/* Page Header */}
          <div className="animate-fade-in-up">
            <h1 className="text-2xl font-bold tracking-tight text-on-surface">
              Dashboard
            </h1>
            <p className="text-sm text-on-surface-variant mt-1">
              Overview of your morph generation activity
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children">
            <StatCard title="Frames Generated" value={frames.length || 0} />
            <StatCard title="Steps Used" value={steps} />
            <StatCard title="Playback FPS" value={fps} />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Recent Morph Preview */}
            <div className="lg:col-span-2 card">
              <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">visibility</span>
                Recent Morph Preview
              </h2>

              <div className="flex items-center justify-center h-64 bg-surface-variant rounded-lg border border-outline/50">
                {frames.length > 0 ? (
                  <img
                    src={frames[frames.length - 1]}
                    className="max-h-full rounded-lg shadow-lg animate-scale-in"
                    alt="Latest morph frame"
                  />
                ) : (
                  <EmptyState text="No morph generated yet" />
                )}
              </div>
            </div>

            {/* System Info Panel */}
            <div className="card">
              <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">info</span>
                System Info
              </h2>

              <div className="space-y-3">
                <InfoItem label="Model" value="ConvVAE64" />
                <div className="divider" />
                <InfoItem label="Device" value="CPU" />
                <div className="divider" />
                <InfoItem label="Interpolation" value="Slerp" />
                <div className="divider" />
                <InfoItem label="Resolution" value="256×256" />
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}