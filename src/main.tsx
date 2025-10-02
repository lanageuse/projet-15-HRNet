import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";

/**
 * Point d'entrée principal de l'application
 * Configure le routeur.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <title>{import.meta.env.VITE_APP_TITLE}</title>
      <meta name="description" content="HRNet software application"/>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
