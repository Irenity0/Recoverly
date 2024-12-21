import { useState, useEffect } from "react";

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // Apply theme to the document
    useEffect(() => {
        const activeTheme = theme === "light" ? "mytheme" : "mytheme_dark";
        document.documentElement.setAttribute("data-theme", activeTheme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Toggle between light and dark modes
    const toggleTheme = () => {
        setTheme((prev) => {
            const newTheme = prev === "light" ? "dark" : "light";
            document.documentElement.setAttribute("data-theme", `mytheme_${newTheme}`);
            localStorage.setItem("theme", newTheme);
            return newTheme;
        });
    };

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-primary text-sm"
            aria-label="Toggle Dark/Light Mode"
        >
            {theme === "light" ? "🌙" : "☀️"}
        </button>
    );
};

export default ThemeToggle;

                