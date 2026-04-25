import GeneratedDataset from "../components/GeneratedDataset";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Dataset() {
  return (
    <div className="flex h-screen bg-surface-container text-on-surface">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex flex-col flex-1 ml-64">

        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <main className="p-6 flex flex-col gap-6 overflow-y-auto">

          {/* Page Header */}
          <div className="animate-fade-in-up">
            <h1 className="text-2xl font-bold tracking-tight text-on-surface flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[28px]">dataset</span>
              Dataset
            </h1>
            <p className="text-sm text-on-surface-variant mt-2 max-w-2xl">
              Generated frames can be used as synthetic data for training machine learning models. 
              Each frame represents an intermediate latent transition between source and target digits.
            </p>
          </div>

          {/* Dataset Section */}
          <GeneratedDataset />

        </main>
      </div>
    </div>
  );
}