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
        <div className="flex flex-col gap-4 mt-4 w-fit">
            <button onClick={toggleTheme} className="btn btn-primary rounded-lg">
                {theme === "forest" ? "☀️ Light Mode": "🌙 Dark Mode"}
            </button>
            <button onClick={handleLogout} className="btn btn-error rounded-lg mt-6">
                Logout
            </button>
        </div>
    </div>
    );
}