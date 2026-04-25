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
    desc: "Combines VAE's structured latent space with a GAN discriminator to improve visual realism. Produces sharper and more detailed digits while maintaining smooth interpolation.",
    status: "Ready",
  }
];

export default function ModelRegistry() {
  const { selectedModel, setModel } = useMorphStore();

  const current = MODELS.find((m) => m.id === selectedModel);

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
              <span className="material-symbols-outlined text-primary text-[28px]">inventory_2</span>
              Model Registry
            </h1>
            <p className="text-sm text-on-surface-variant mt-2">
              Select and manage available neural network architectures for morph generation.
            </p>
          </div>

          {/* Model Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
            {MODELS.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                selected={selectedModel === model.id}
                onClick={() => setModel(model.id)}
              />
            ))}
          </div>

          {/* Details Panel */}
          {current && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
              
              {/* Model Info */}
              <div className="lg:col-span-2 card">
                <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary">description</span>
                  Model Details
                </h2>

                <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                  {current.desc}
                </p>

                <div className="flex flex-wrap gap-6 text-sm border-t border-outline pt-4">
                  <Info label="Type" value={current.type} />
                  <Info label="Architecture" value="Encoder-Decoder" />
                  <Info label="Status" value={current.status} />
                  <Info label="Latent Dim" value="64" />
                </div>
              </div>

              {/* Model Stats */}
              <div className="card">
                <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary">bar_chart</span>
                  Performance
                </h2>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-on-surface-variant">Reconstruction</span>
                      <span className="font-mono font-medium text-on-surface">98.2%</span>
                    </div>
                    <div className="h-1.5 bg-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: '98.2%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-on-surface-variant">Latent Structure</span>
                      <span className="font-mono font-medium text-on-surface">High</span>
                    </div>
                    <div className="h-1.5 bg-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-on-surface-variant">Inference Speed</span>
                      <span className="font-mono font-medium text-on-surface">12ms</span>
                    </div>
                    <div className="h-1.5 bg-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-accent to-success rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  );
}