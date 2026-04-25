import { BrowserRouter, Routes, Route } from "react-router-dom";
import Morphology from "./pages/Morphology";
import LatentSpace from "./pages/LatentSpace";
import Dashboard from "./pages/Dashboard";
import TrainingLoss from "./pages/TrainingLoss";
import ModelRegistry from "./pages/ModelRegistry";
import Dataset from "./pages/Dataset";

import './styles/animations.css';
import './styles/components.css';
import './styles/design-tokens.css';
import './styles/global.css';
import './styles/responsive.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Morphology />} />
        <Route path="/latent" element={<LatentSpace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/training-loss" element={<TrainingLoss />} />
        <Route path="/model-registry" element={<ModelRegistry />} /> 
        <Route path="/dataset" element={<Dataset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;