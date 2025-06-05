import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SelectedItemProvider } from "./context/selected-item-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SelectedItemProvider>
      <App />
    </SelectedItemProvider>
  </StrictMode>
);
