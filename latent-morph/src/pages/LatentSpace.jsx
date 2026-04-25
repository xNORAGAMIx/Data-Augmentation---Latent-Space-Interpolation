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
        <div className="flex h-screen bg-surface-container text-on-surface">
            <Sidebar />
            <div className="flex flex-col flex-1 ml-64">
                <Topbar />
                <main className="flex flex-1 p-6 gap-6 overflow-hidden">
                    
                    {/* Controls Panel */}
                    <div className="w-[300px] space-y-4 overflow-y-auto max-h-[80vh] pr-2">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[22px]">tune</span>
                            Latent Controls
                        </h2>

                        <p className="text-xs text-on-surface-variant">
                            Adjust individual latent dimensions to explore the latent space.
                        </p>

                        <div className="space-y-3">
                            {z.map((val, i) => (
                                <div key={i} className="flex flex-col gap-1.5">
                                    <div className="flex justify-between text-xs">
                                        <span className="font-mono text-on-surface-variant">Z{i}</span>
                                        <span className="badge badge-primary font-mono">{val.toFixed(1)}</span>
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
                                        className="w-full h-2 bg-surface-variant rounded-full appearance-none cursor-pointer
                                                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                                                  [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary 
                                                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md
                                                  [&::-webkit-slider-thumb]:cursor-pointer hover:[&::-webkit-slider-thumb]:scale-110
                                                  transition-all duration-200"
                                    />
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleDecode}
                            className="btn-primary w-full py-2.5 text-sm"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                                    Decoding...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                                    Decode Latent
                                </>
                            )}
                        </button>
                    </div>

                    {/* Preview Area */}
                    <div className="flex flex-col flex-1 relative">
                        <div className="flex-1 flex items-center justify-center border border-outline/50 rounded-xl bg-gradient-to-br from-surface-container to-surface shadow-inner relative overflow-hidden">
                            <CanvasOverlay />
                            
                            {loading ? (
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                    <p className="text-sm text-on-surface-variant">Decoding latent vector...</p>
                                </div>
                            ) : image ? (
                                <img 
                                    src={image} 
                                    className="max-w-md rounded-lg shadow-2xl animate-scale-in" 
                                    alt="Decoded latent representation" 
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center opacity-60">
                                    <span className="material-symbols-outlined text-[64px] text-primary/30 mb-3">
                                        blur_on
                                    </span>
                                    <p className="text-sm font-medium text-on-surface-variant">
                                        No latent decoded
                                    </p>
                                    <p className="text-xs text-on-surface-variant/70 mt-1">
                                        Adjust sliders and click Decode
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}