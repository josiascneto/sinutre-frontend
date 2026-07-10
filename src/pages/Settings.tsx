import { useNavigate } from 'react-router-dom';
import { clearToken } from '@/lib/api';
import { useEffect, useState } from "react";
import { SimpleHeader } from '@/components/layout/SimpleHeader';

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
    <div className="w-full max-w-[1200px] mx-auto">
        <SimpleHeader title="Configurações" subtitle="Gerenciar configurações da página"/>
        <p>Trocar tema da página</p>
        <button onClick={toggleTheme} className="btn btn-primary">
            {theme === "forest" ? "☀️ Light Mode": "🌙 Dark Mode"}
        </button>
        <button onClick={handleLogout} className="btn btn-error mt-6">
            Logout
        </button>
    </div>
    );
}