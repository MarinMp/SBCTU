import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Pacientes from "./pages/Pacientes";
import PersonalMedico from "./pages/PersonalMedico";
import Sintomas from "./pages/Sintomas";
import Enfermedades from "./pages/Enfermedades";
import NivelesUrgencia from "./pages/NivelesUrgencia";
import Visitas from "./pages/Visitas";
import Triage from "./pages/Triage";
import Diagnosticos from "./pages/Diagnosticos";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/personal-medico" element={<PersonalMedico />} />
          <Route path="/sintomas" element={<Sintomas />} />
          <Route path="/enfermedades" element={<Enfermedades />} />
          <Route path="/niveles-urgencia" element={<NivelesUrgencia />} />
          <Route path="/visitas" element={<Visitas />} />
          <Route path="/triages" element={<Triage />} />
          <Route path="/diagnosticos" element={<Diagnosticos />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
