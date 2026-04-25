import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Controls from "../components/Controls";
import Canvas from "../components/Canvas";
import Timeline from "../components/Timeline";

export default function Morphology() {
  return (
    <div className="flex h-screen bg-[var(--color-surface)] text-[var(--color-on-surface)]">
      <Sidebar />

      <div className="flex flex-col flex-1 ml-64">
        <Topbar />

        <div className="flex flex-1 p-6 gap-6 overflow-hidden">
          <Controls />
          <div className="flex flex-col flex-1">
            <Canvas />
            <Timeline />
          </div>
        </div>
      </div>
    </div>
  );
}