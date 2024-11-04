import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { MusicProvider } from "./contexts/music.context.jsx";

createRoot(document.getElementById("root")).render(
  <MusicProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MusicProvider>
);
