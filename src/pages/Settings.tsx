import { useNavigate } from 'react-router-dom';
import { clearToken } from '@/lib/api';
import { useEffect, useState } from "react";

export function Settings() {
    const navigate = useNavigate();

    const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "forest"
);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);
    function toggleTheme() {
        setTheme(theme === "forest" ? "light" : "forest");
    }
    function handleLogout() {
    clearToken();
    navigate("/login");
}
    return (
    <div className="p-8">
        <h1 className="text-3xl font-bold">Configurações</h1>
        <button onClick={toggleTheme} className="btn btn-primary">
            {theme === "forest" ? "☀️ Light Mode": "🌙 Forest Mode"}
        </button>
        <button onClick={handleLogout} className="btn btn-error mt-6">
            Logout
        </button>
    </div>
    );
}