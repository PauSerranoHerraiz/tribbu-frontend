import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TribbuGatePage from "./pages/TribbuGatePage";
import TribbuDetailsPage from "./pages/TribbuDetailsPage";
import CreateTribbu from "./components/CreateTribbu";
import NavBar from "./components/NavBar";
import TribbuListPage from "./pages/TribbuListPage";

function App() {
  

  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={ <LoginPage />} />
        <Route path="/signup" element={<SignupPage /> } />
        <Route path="/tribbu-gate" element={<TribbuGatePage /> } />
        <Route path="/create-tribbu" element={<CreateTribbu />} />
        <Route path="/tribbus" element={<TribbuListPage />} />
        <Route path="/tribbu" element={<TribbuDetailsPage />} />
      </Routes>
    </div>
  ) 
} 

export default App