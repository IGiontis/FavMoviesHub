import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, CardTitle } from "reactstrap";

import NavbarLandingPage from "./components/LandingPage/NavbarLandingPage";
import PageNotFound from "./pages/PageNotFound";
import LandingPage from "./components/LandingPage/LandingPage";
import Layout from "./components/Layout";
import CreateAccount from "./components/LandingPage/CreateAccount";
import "./App.css";

function App() {
  const savedTheme = localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState(savedTheme === "dark");

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  return (
    <BrowserRouter>
      <Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="about" element={<LandingPage />}>
            <Route index element={<NavbarLandingPage />} />
            <Route path="project/:id" element={<NavbarLandingPage />} />
          </Route>
          <Route path="register" element={<CreateAccount />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
