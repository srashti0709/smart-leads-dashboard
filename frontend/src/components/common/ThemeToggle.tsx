import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`w-14 h-8 flex items-center rounded-full p-1 transition duration-300 ${
        darkMode ? "bg-blue-600" : "bg-gray-400"
      }`}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition duration-300 flex items-center justify-center text-xs ${
          darkMode ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {darkMode ? "🌙" : "☀"}
      </div>
    </button>
  );
}