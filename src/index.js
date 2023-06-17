import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import AuthProvider from "./contexts/AuthContext.js";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./utils/theme.js";
import ThemeProvider from "@mui/material/styles/ThemeProvider.js";
import App from "./app.js";
import Layout from "./components/Layout.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Layout>
            <App />
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
