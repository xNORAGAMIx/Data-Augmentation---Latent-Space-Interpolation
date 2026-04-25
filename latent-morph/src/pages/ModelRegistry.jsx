import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ModelCard from "../components/ModelCard";
import Info from "../components/Info";
import { useMorphStore } from "../store/useMorphStore";

const MODELS = [
  {
    id: "autoencoder",
    name: "Autoencoder",
    type: "AE",
    desc: "Learns direct input reconstruction using a compressed latent vector. The latent space is unstructured, so interpolation is linear but often not semantically meaningful, leading to unstable morphing.",
    status: "Ready",
  },
  {
    id: "vae",
    name: "Variational Autoencoder",
    type: "VAE",
    desc: "Introduces a probabilistic latent space using KL divergence, enforcing a smooth Gaussian distribution. Enables meaningful interpolation between digits, but often produces slightly blurry outputs.",
    status: "In Progress",
  },
  {
    id: "conv_vae",
    name: "Convolutional VAE",
    type: "VAE",
    desc: "Uses convolutional layers to better capture spatial structure in images. Produces sharper and more coherent digits than fully connected VAE while preserving a smooth latent space for interpolation.",
    status: "In Progress",
  },
  {
    id: "vae_gan",
    name: "VAE + GAN",
    type: "Hybrid",
    desc: "Combines VAE’s structured latent space with a GAN discriminator to improve visual realism. Produces sharper and more detailed digits while maintaining smooth interpolation.",
    status: "Ready",
  }
];

export default function ModelRegistry() {
  const { selectedModel, setModel } = useMorphStore();

  const current = MODELS.find((m) => m.id === selectedModel);

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
            Model Registry
          </h1>

          {/* ===== MODEL GRID ===== */}
          <div className="grid grid-cols-4 gap-4">

            {MODELS.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                selected={selectedModel === model.id}
                onClick={() => setModel(model.id)}
              />
            ))}

          </div>

          {/* ===== DETAILS PANEL ===== */}
          <div className="grid grid-cols-3 gap-6">

            {/* Model Info */}
            <div className="col-span-2 bg-white border rounded p-4">
              <h2 className="text-sm font-semibold mb-3">
                Model Details
              </h2>

              <p className="text-sm text-gray-600">
                {current.desc}
              </p>

              <div className="flex gap-4 mt-4 text-sm">
                <Info label="Type" value={current.type} />
                <Info label="Architecture" value="Encoder-Decoder" />
                <Info label="Status" value={current.status} />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}