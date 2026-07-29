import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function GoalCard() {
    const [goal, setGoal] = useState(2000);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    loadGoal();
    }, []);

    async function loadGoal() {
    try {
        const response = await api.get("/user-health");

        if (response.data) {
        setGoal(response.data.targetDietDaily);
        }
    } catch (err) {
        console.error(err);
    }
    }

    async function saveGoal() {
    try {
        setLoading(true);

        await api.put("/user-health", {
        targetDietDaily: goal,
        levelActivity: "SEDENTARIO",
        });

        alert("Meta salva com sucesso!");
    } catch (err) {
            console.error(err);
        alert("Erro ao salvar a meta.");
    } finally {
        setLoading(false);
    }
    }

    return (
    <div className="card bg-base-100 shadow">
        <div className="card-body">
        <h2 className="card-title">
            Meta diária de calorias
        </h2>

        <input
            type="number"
            className="input input-bordered mt-4"
            value={goal}
            onChange={(e) =>
            setGoal(Number(e.target.value))
            }
        />

        <button
            className="btn btn-primary mt-4"
            onClick={saveGoal}
            disabled={loading}
        >
            {loading ? "Salvando..." : "Salvar"}
        </button>
        </div>
    </div>
    );
}