import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import AuthProvider from "./contexts/AuthContext.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { theme } from "./utils/theme.js";
import ThemeProvider from "@mui/material/styles/ThemeProvider.js";
import App from "./app.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
