import GeneratedDataset from "../components/GeneratedDataset";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Dataset() {
  return (
    <div className="flex h-screen bg-[var(--color-surface)] text-[var(--color-on-surface)]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex flex-col flex-1 ml-64">

        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <div className="p-6 flex flex-col gap-6 overflow-y-auto">

          {/* Header */}
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Dataset
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Generated frames can be used as synthetic data for training models.
            </p>
          </div>

          {/* Dataset Section */}
          <GeneratedDataset />

        </div>
      </div>
    </div>
  );
}