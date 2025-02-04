import { useState, useEffect } from "react";

const useTheme = () => {
  const getSavedTheme = () => localStorage.getItem("theme") || "light";
  const [isDarkMode, setIsDarkMode] = useState(getSavedTheme() === "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", isDarkMode ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light"); 
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);
  

  const toggleTheme = () => setIsDarkMode((prevMode) => !prevMode);

  return { isDarkMode, toggleTheme };
};

export default useTheme;
