import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import App from "./app";
import UserContextProvider from "./contexts/UserContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ThemeProvider>
  </StrictMode>
);
