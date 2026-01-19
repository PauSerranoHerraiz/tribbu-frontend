import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TribbuGatePage from "./pages/TribbuGatePage";
import TribbuDetailsPage from "./pages/TribbuDetailsPage";
import CreateTribbu from "./components/CreateTribbu";
import NavBar from "./components/NavBar";
import TribbuListPage from "./pages/TribbuListPage";
import EditTribbusPage from "./pages/EditTribbuPage";
import Card from "./components/ui/Card";
import Button from "./components/ui/Button";
import RoleBadge from "./components/ui/RoleBadge";

function App() {
  

  return (

    
    <div className="min-h-screen bg-slate-50 p-8 space-y-6">
      <Card>
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Familia Serrano
        </h2>
        <RoleBadge role="guardian" />
        <p className="mt-4 text-slate-600">
          Gestiona roles y permisos de forma sencilla.
        </p>
        <div className="mt-4">
          <Button>Entrar</Button>
        </div>
      </Card>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={ <LoginPage />} />
        <Route path="/signup" element={<SignupPage /> } />
        <Route path="/tribbu-gate" element={<TribbuGatePage /> } />
        <Route path="/create-tribbu" element={<CreateTribbu />} />
        <Route path="/tribbus" element={<TribbuListPage />} />
        <Route path="/tribbus/edit/:tribbuId" element={<EditTribbusPage />} />
        <Route path="/tribbus/:tribbuId" element={<TribbuDetailsPage />} />
      </Routes>
    </div>
  ) 
} 

export default App