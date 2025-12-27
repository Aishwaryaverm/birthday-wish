// src/entry-client.jsx
import "./index.css";          // ✅ Tailwind CSS yahin import hoga
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <App />
  </StrictMode>
);

