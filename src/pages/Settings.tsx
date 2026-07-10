import { useNavigate } from 'react-router-dom';
import { clearToken } from '@/lib/api';

export function Settings() {
    const navigate = useNavigate();

    function handleLogout() {
    clearToken();
    navigate("/login");
}
    return (
    <div className="p-8">
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="mt-4">Página em desenvolvimento.</p>
        <button onClick={handleLogout} className="btn btn-error mt-6">
        Logout
        </button>
    </div>
    );
}