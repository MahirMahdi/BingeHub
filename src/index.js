import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import AuthProvider from "./contexts/AuthContext.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { theme } from "./utils/theme.js";
import ThemeProvider from "@mui/material/styles/ThemeProvider.js";
const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/searched/:search" element={<Search />} />
            <Route path="/movies/:page" element={<Movies />} />
            <Route path="/tvshows/:page" element={<TvShows />} />
            <Route path="/login" element={<Login />} />
            <Route path="/watchlist/:id" element={<WatchList />} />
            <Route path="/detail/:type/:id/:user_id" element={<Detail />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

root.render(<App />);
