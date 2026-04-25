import { useState } from "react";
import { decodeLatent } from "../api/latentApi";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import CanvasOverlay from "../components/CanvasOverlay";
import { useMorphStore } from "../store/useMorphStore";

const LATENT_DIM = 64;

export default function LatentSpace() {
    const { selectedModel } = useMorphStore();
    const [z, setZ] = useState(Array(LATENT_DIM).fill(0));
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const updateValue = (index, value) => {
        const newZ = [...z];
        newZ[index] = value;
        setZ(newZ);
    };

    const handleDecode = async () => {
        setLoading(true);
        const img = await decodeLatent(z, selectedModel);
        setImage(img);
        setLoading(false);
    };

    return (
        <div className="flex h-screen bg-[var(--color-surface)] text-[var(--color-on-surface)]">
            <Sidebar />
            <div className="flex flex-col flex-1 ml-64">
                <Topbar />
                <div className="flex flex-1 p-6 gap-6 overflow-hidden">
                    <div className="w-[300px] space-y-3 overflow-y-auto max-h-[80vh]">

                        <h2 className="text-lg font-semibold">Latent Controls</h2>

                        {z.map((val, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <div className="flex justify-between text-xs">
                                    <span>Z{i}</span>
                                    <span className="text-primary">{val.toFixed(1)}</span>
                                </div>

                                <input
                                    type="range"
                                    min={-3}
                                    max={3}
                                    step={0.1}
                                    value={val}
                                    onChange={(e) =>
                                        updateValue(i, Number(e.target.value))
                                    }
                                    className="w-full latent-slider"
                                />
                            </div>
                        ))}

                        <button
                            onClick={handleDecode}
                            className="w-full bg-primary bg-[var(--color-primary)] text-white py-2 rounded"
                        >
                            Decode
                        </button>

                    </div>

                    <div className="flex flex-col flex-1 relative">
                        <CanvasOverlay />
                        <div className="flex-1 flex items-center justify-center border rounded">

                            {loading ? (
                                <p>Decoding...</p>
                            ) : image ? (
                                <img src={image} className="max-w-md" />
                            ) : (
                                <p>No latent decoded</p>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}