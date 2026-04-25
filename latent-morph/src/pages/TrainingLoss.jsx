import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import LossCard from "../components/LossCard";
import Info from "../components/Info";
import MiniCard from "../components/MiniCard";

export default function TrainingLoss() {
  return (
    <div className="flex h-screen bg-[var(--color-surface)] text-[var(--color-on-surface)]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex flex-col flex-1 ml-64">

        <Topbar />

        <div className="p-6 flex flex-col gap-6 overflow-y-auto">

          {/* Title */}
          <h1 className="text-2xl font-semibold tracking-tight">
            Training Loss Overview
          </h1>

          {/* ===== OVERVIEW ===== */}
          <div className="bg-white border rounded p-4">
            <p className="text-sm text-gray-600">
              This model combines reconstruction accuracy, latent space regularization,
              and adversarial learning to generate smooth and realistic digit transitions.
            </p>
          </div>

          {/* ===== LOSS CARDS ===== */}
          <div className="grid grid-cols-3 gap-4">

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

          {/* ===== BETA VAE ===== */}
          <div className="bg-white border rounded p-4">
            <h2 className="text-sm font-semibold mb-2">
              β-VAE Balancing
            </h2>

            <p className="text-sm text-gray-600">
              The β parameter controls the balance between reconstruction quality and latent structure.
            </p>

            <div className="flex gap-4 mt-3 text-sm">
              <span className="px-3 py-1 bg-gray-100 rounded">
                β = 0.5
              </span>
              <span className="text-gray-500">
                Balanced sharpness and structure
              </span>
            </div>
          </div>

          {/* ===== TOTAL LOSS ===== */}
          <div className="bg-white border rounded p-4">
            <h2 className="text-sm font-semibold mb-2">
              Total Loss Function
            </h2>

            <div className="bg-gray-50 border rounded p-3 text-center text-sm font-mono">
              Loss = Recon + β · KL + λ · GAN
            </div>

            <div className="flex gap-6 mt-4 text-sm">
              <Info label="β (KL weight)" value="0.5" />
              <Info label="λ (GAN weight)" value="0.1" />
            </div>
          </div>

          {/* ===== INTERPRETATION ===== */}
          <div className="grid grid-cols-3 gap-4">

            <MiniCard title="Reconstruction" text="Ensures correctness of generated digit" />
            <MiniCard title="KL Divergence" text="Maintains smooth latent transitions" />
            <MiniCard title="GAN" text="Enhances visual realism" />

          </div>

        </div>
      </div>
    </div>
  );
}