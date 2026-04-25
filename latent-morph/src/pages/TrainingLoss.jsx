import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import LossCard from "../components/LossCard";
import Info from "../components/Info";
import MiniCard from "../components/MiniCard";

export default function TrainingLoss() {
  return (
    <div className="flex h-screen bg-surface-container text-on-surface">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex flex-col flex-1 ml-64">

        <Topbar />

        <main className="p-6 flex flex-col gap-6 overflow-y-auto">

          {/* Page Header */}
          <div className="animate-fade-in-up">
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[28px]">analytics</span>
              Training Loss Overview
            </h1>
            <p className="text-sm text-on-surface-variant mt-2 max-w-3xl">
              This model combines reconstruction accuracy, latent space regularization,
              and adversarial learning to generate smooth and realistic digit transitions.
            </p>
          </div>

          {/* Overview Card */}
          <div className="card">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">lightbulb</span>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Training combines multiple loss functions to balance reconstruction quality, 
                latent space structure, and visual realism. Each component plays a critical role 
                in producing high-quality morphs.
              </p>
            </div>
          </div>

          {/* Loss Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children">
            <LossCard
              title="Reconstruction Loss"
              color="blue"
              desc="Ensures output image resembles the input"
              detail="Measures pixel-wise difference between input and reconstructed image using MSE."
            />

            <LossCard
              title="KL Divergence"
              color="purple"
              desc="Structures latent space"
              detail="Forces latent distribution to follow a normal distribution for smooth interpolation."
            />

            <LossCard
              title="GAN Loss"
              color="pink"
              desc="Improves realism"
              detail="Encourages generated images to resemble real handwritten digits."
            />
          </div>

          {/* Beta VAE */}
          <div className="card">
            <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">balance</span>
              β-VAE Balancing
            </h2>

            <p className="text-sm text-on-surface-variant mb-4">
              The β parameter controls the balance between reconstruction quality and latent structure.
              Higher β values enforce stronger latent regularization.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="badge badge-primary">β = 0.5</span>
              <span className="badge">β = 1.0 (Standard)</span>
              <span className="badge">β = 4.0 (Structured)</span>
            </div>
            
            <p className="text-xs text-on-surface-variant mt-3">
              Current configuration: Balanced sharpness and structure with β = 0.5
            </p>
          </div>

          {/* Total Loss */}
          <div className="card">
            <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">functions</span>
              Total Loss Function
            </h2>

            <div className="bg-surface-variant border border-outline rounded-lg p-4 text-center">
              <code className="text-sm font-mono text-primary font-medium">
                Loss = Recon + β · KL + λ · GAN
              </code>
            </div>

            <div className="flex flex-wrap gap-8 mt-4">
              <Info label="β (KL weight)" value="0.5" />
              <Info label="λ (GAN weight)" value="0.1" />
              <Info label="Optimizer" value="Adam" />
            </div>
          </div>

          {/* Interpretation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MiniCard title="Reconstruction" text="Ensures correctness of generated digit" />
            <MiniCard title="KL Divergence" text="Maintains smooth latent transitions" />
            <MiniCard title="GAN" text="Enhances visual realism and sharpness" />
          </div>

          {/* Training Metrics */}
          <div className="card">
            <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">monitoring</span>
              Training Metrics
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-surface-variant rounded-lg">
                <p className="text-xs text-on-surface-variant mb-1">Epochs</p>
                <p className="text-2xl font-bold text-on-surface">200</p>
              </div>
              <div className="text-center p-4 bg-surface-variant rounded-lg">
                <p className="text-xs text-on-surface-variant mb-1">Batch Size</p>
                <p className="text-2xl font-bold text-on-surface">128</p>
              </div>
              <div className="text-center p-4 bg-surface-variant rounded-lg">
                <p className="text-xs text-on-surface-variant mb-1">Learning Rate</p>
                <p className="text-2xl font-bold text-on-surface">1e-3</p>
              </div>
              <div className="text-center p-4 bg-surface-variant rounded-lg">
                <p className="text-xs text-on-surface-variant mb-1">Dataset Size</p>
                <p className="text-2xl font-bold text-on-surface">60K</p>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}