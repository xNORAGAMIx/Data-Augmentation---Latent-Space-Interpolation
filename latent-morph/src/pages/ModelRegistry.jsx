import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ModelCard from "../components/ModelCard";
import Info from "../components/Info";

const MODELS = [
  {
    id: "autoencoder",
    name: "Autoencoder",
    type: "AE",
    desc: "Basic reconstruction model without latent regularization",
  },
  {
    id: "vae",
    name: "Variational Autoencoder",
    type: "VAE",
    desc: "Structured latent space with KL divergence",
  },
  {
    id: "conv_vae",
    name: "Conv VAE",
    type: "VAE",
    desc: "Convolutional encoder-decoder for better spatial learning",
  },
  {
    id: "vae_gan",
    name: "VAE + GAN",
    type: "Hybrid",
    desc: "Combines VAE structure with GAN realism",
  },
];

export default function ModelRegistry() {
  const [selectedModel, setSelectedModel] = useState("vae_gan");

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
                onClick={() => setSelectedModel(model.id)}
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
                <Info label="Status" value="Ready" />
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white border rounded p-4 flex flex-col gap-3">
              <h2 className="text-sm font-semibold">
                Actions
              </h2>

              <button className="bg-primary text-white py-2 rounded hover:opacity-90 transition">
                Run Morph with Model
              </button>

              <button className="border py-2 rounded hover:bg-gray-50 transition">
                Compare Mode (Coming Soon)
              </button>
            </div>

          </div>

          {/* ===== OPTIONAL COMPARE PREVIEW ===== */}
          <div className="bg-white border rounded p-4">
            <h2 className="text-sm font-semibold mb-3">
              Model Comparison Preview
            </h2>

            <div className="grid grid-cols-4 gap-4">
              {MODELS.map((m) => (
                <div
                  key={m.id}
                  className="h-32 bg-gray-50 rounded flex items-center justify-center text-xs text-gray-400"
                >
                  {m.name}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}