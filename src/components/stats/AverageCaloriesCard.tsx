import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Meal {
    eatTime: string;
    totals: {
    calories: number;
    };
}

export function AverageCaloriesCard() {
    const [average, setAverage] = useState(0);
    const [goal, setGoal] = useState(0);

    useEffect(() => {
    loadData();
    }, []);

    async function loadData() {
    const [mealsResponse, goalResponse] = await Promise.all([
        api.get("/meals"),
        api.get("/user-health"),
    ]);

    const meals: Meal[] = mealsResponse.data;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentMeals = meals.filter(
        (meal) => new Date(meal.eatTime) >= sevenDaysAgo
    );

    const totalCalories = recentMeals.reduce(
        (acc, meal) => acc + meal.totals.calories,
        0
    );

    setAverage(totalCalories / 7);
    setGoal(goalResponse.data.targetDietDaily);
    }

    return (
    <div className="card bg-base-100 shadow">
        <div className="card-body">
        <h2 className="card-title">
            Média calórica (7 dias)
        </h2>

        <p className="text-5xl font-bold">
            {average.toFixed(0)} kcal
        </p>

        <p className="text-base-content/70">
            Meta diária: {goal} kcal
        </p>

        <div
            className={`badge badge-lg ${
            average <= goal
                ? "badge-success"
                : "badge-error"
            }`}
        >
            {average <= goal
            ? `${(goal - average).toFixed(0)} kcal abaixo da meta`
            : `${(average - goal).toFixed(0)} kcal acima da meta`}
        </div>
        </div>
    </div>
    );
}