import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface WeightLog {
    id: number;
    weight: number;
    height: number;
    createdAt: string;
}

export function WeightChart() {
    const [data, setData] = useState<WeightLog[]>([]);

    useEffect(() => {
    loadWeights();
    }, []);

    async function loadWeights() {
    const response = await api.get("/weights");
    setData(response.data);
    }

    const chartData = data.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString("pt-BR"),
    weight: item.weight,
    }));

    return (
    <div className="card bg-base-100 shadow">
        <div className="card-body">
        <h2 className="card-title">
            Evolução do peso
        </h2>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
                type="monotone"
                dataKey="weight"
                stroke="#22c55e"
                strokeWidth={3}
            />
            </LineChart>
        </ResponsiveContainer>
        </div>
    </div>
    );
}