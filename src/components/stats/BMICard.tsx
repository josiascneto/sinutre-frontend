import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function BMICard() {
    const [bmi, setBmi] = useState<number | null>(null);

    useEffect(() => {
    loadBMI();
    }, []);

    async function loadBMI() {
    const response = await api.get("/weights");

    if (response.data.length === 0) return;

    const last =
        response.data[response.data.length - 1];

    const value =
      last.weight / (last.height * last.height);

    setBmi(value);
    }

    function getStatus(value: number) {
    if (value < 18.5) return "Magreza";
    if (value < 25) return "Peso normal";
    if (value < 30) return "Sobrepeso";
    return "Obesidade";
    }

    return (
    <div className="card bg-base-100 shadow">
        <div className="card-body">
        <h2 className="card-title">
            Índice de Massa Corporal
        </h2>
        {bmi === null ? (
            <p>Nenhum peso cadastrado.</p>
        ) : (
            <>
            <p className="text-5xl font-bold">
                {bmi.toFixed(1)}
            </p>
            <div className="badge badge-primary badge-lg mt-3">
                {getStatus(bmi)}
            </div>
            </>
        )}
        </div>
    </div>
    );
}