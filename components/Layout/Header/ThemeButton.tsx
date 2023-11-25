import { useEffect, useState } from "react";
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return storedTheme ? JSON.parse(storedTheme) : prefersDark;
  });

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", JSON.stringify(newMode));
    document.documentElement.classList.toggle("dark-mode", newMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <button
      className="theme-toggle-button"
      onClick={toggleTheme}>
      {darkMode ? <MdOutlineLightMode /> : <MdOutlineNightlight />}
    </button>
  );
};

export default ThemeToggle;
