import { useState } from "react";
import { api } from "@/lib/api";

export function WeightCard() {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [loading, setLoading] = useState(false);

    async function saveWeight() {
    try {
        setLoading(true);

        await api.post("/weights", {
        weight: Number(weight),
        height: Number(height),
        });
        alert("Registro salvo com sucesso!");
        setWeight("");
        setHeight("");
    } catch (error) {
        console.error(error);
        alert("Erro ao salvar.");
    } finally {
        setLoading(false);
    }
    }

    return (
    <div className="card bg-base-100 shadow">
        <div className="card-body">
        <h2 className="card-title">
            Registrar medidas
        </h2>

        <label className="label">
            <span className="label-text">
            Peso (kg)
            </span>
        </label>

        <input
            type="number"
            step="0.1"
            className="input input-bordered"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
        />

        <label className="label mt-3">
            <span className="label-text">
            Altura (m)
            </span>
        </label>

        <input
            type="number"
            step="0.01"
            className="input input-bordered"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
        />

        <button
            className="btn btn-primary mt-5"
            onClick={saveWeight}
            disabled={loading}
        >
            {loading ? "Salvando..." : "Salvar"}
        </button>

        </div>
    </div>
    );
}