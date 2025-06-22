import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./store/AuthContext.tsx";
import { HeroUIProvider } from "@heroui/react";

createRoot(document.getElementById("root")!).render(
  <HeroUIProvider>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </HeroUIProvider>
);
