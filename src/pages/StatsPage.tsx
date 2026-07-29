import { GoalCard } from "@/components/stats/GoalCard";
import { WeightCard } from "@/components/stats/WeightCard";
import { CaloriesChart } from "@/components/stats/CaloriesChart";
import { WeightChart } from "@/components/stats/WeightChart";
import { CategoryChart } from "@/components/stats/CategoryChart";
import { SimpleHeader } from "@/components/layout/SimpleHeader";
import { BMICard } from "@/components/stats/BMICard";
import { AverageCaloriesCard } from "@/components/stats/AverageCaloriesCard";

export function StatsPage() {
return (
    <div className="w-full max-w-[1200px] mx-auto">
        <SimpleHeader
            title="Progresso"
            subtitle="Acompanhe sua evolução"
        />

        <div className="grid gap-6 mt-8">
            <div className="grid md:grid-cols-2 gap-6">
                <GoalCard />
                <WeightCard />
            </div>
            <CaloriesChart />
            <WeightChart />
            <CategoryChart />
            <BMICard />
            <AverageCaloriesCard />
        </div>
    </div>
);
}