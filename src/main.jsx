import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Profile from "./components/Profile.jsx";
import LandingPage from "./components/LandingPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<LandingPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
