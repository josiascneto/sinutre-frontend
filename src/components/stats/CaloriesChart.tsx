import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { api } from "@/lib/api";

interface Meal {
    eatTime: string;
    totals: {
    calories: number;
    
    };
}

interface ChartData {
    date: string;
    calories: number;
}

export function CaloriesChart() {
    const [data, setData] = useState<ChartData[]>([]);
    useEffect(() => {
    async function load() {
        const response = await api.get<Meal[]>("/meals");
        const last30 = Array.from({ length: 30 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        return {
            key: d.toISOString().slice(0, 10),
            label: d.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            }),
            calories: 0,
        };
        });
        response.data.forEach((meal) => {
        const key = new Date(meal.eatTime)
            .toISOString()
            .slice(0, 10);
        const day = last30.find((d) => d.key === key);
        if (day) {
            day.calories += meal.totals.calories;
        }
        });
        setData(
        last30.map((d) => ({
            date: d.label,
            calories: Number(d.calories.toFixed(2)),
        }))
        );
    }
    load();
    }, []);
    return (
    <div className="card bg-base-100 shadow">
        <div className="card-body">
        <h2 className="card-title">
            Calorias dos últimos 30 dias
        </h2>
        <div className="h-80">
            <ResponsiveContainer
            width="100%"
            height="100%"
            >
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                type="monotone"
                dataKey="calories"
                stroke="#22c55e"
                strokeWidth={3}
                />
            </LineChart>
            </ResponsiveContainer>
        </div>
        </div>
    </div>
    );
}