import { useContext } from "react";
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
import Layout from "./components/Layout";
import Card from "./components/ui/Card";
import Button from "./components/ui/Button";
import RoleBadge from "./components/ui/RoleBadge";
import { AuthContext } from "./context/auth.context";
import EventsPage from "./components/events/EventsPage";
import DemoPage from "./pages/DemoPage";


function App() {
  const { user, isLoading, isLoggedIn } = useContext(AuthContext);

  const tribbuName = user?.tribbuName || user?.tribbu?.name || "Tribbu";
  const username = user?.username || user?.name || "Usuario";
  const role = user?.role || "cachorro";

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 p-8 space-y-6">


        <Routes>
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/tribbu-gate" element={<TribbuGatePage />} />
          <Route path="/create-tribbu" element={<CreateTribbu />} />
          <Route path="/tribbus" element={<TribbuListPage />} />
          <Route path="/tribbus/edit/:tribbuId" element={<EditTribbusPage />} />
          <Route path="/tribbus/:tribbuId" element={<TribbuDetailsPage />} />
          <Route path="/events" element={<EventsPage />} />
        </Routes>

      </div>
    </Layout>
  );
}

export default App;