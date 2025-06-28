import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./store/AuthContext.tsx";
import { HeroUIProvider } from "@heroui/react";
import { Provider } from "react-redux";
import { store } from "./Redux/Store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <HeroUIProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </HeroUIProvider>
  </Provider>
);
