import React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from "./context/auth.context";
import './index.css'
import App from './App.jsx'
import { initGA } from "./utils/analytics";

// Inicializa Google Analytics con tu ID de medición
initGA(import.meta.env.VITE_GA_MEASUREMENT_ID) // Reemplaza con tu ID real

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProviderWrapper>
        <App />
      </AuthProviderWrapper>
    </Router>
  </StrictMode>,
)