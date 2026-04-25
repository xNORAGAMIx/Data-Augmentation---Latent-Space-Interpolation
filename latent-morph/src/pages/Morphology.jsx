import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Controls from "../components/Controls";
import Canvas from "../components/Canvas";
import Timeline from "../components/Timeline";

export default function Morphology() {
  return (
    <div className="flex h-screen bg-surface-container text-on-surface">
      <Sidebar />

      <div className="flex flex-col flex-1 ml-64">
        <Topbar />

        <main className="flex flex-1 p-6 gap-6 overflow-hidden">
          {/* Controls Panel */}
          <Controls />
          
          {/* Canvas & Timeline */}
          <div className="flex flex-col flex-1 gap-4 min-w-0">
            <Canvas />
            <Timeline />
          </div>
        </main>
      </div>
    </div>
  );
}