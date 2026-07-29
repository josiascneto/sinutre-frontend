import { useEffect, useState } from "react";
import { Plus } from "@phosphor-icons/react";

import { SimpleHeader } from "@/components/layout/SimpleHeader";
import { AddFoodModal } from "@/components/modal/AddFoodModal";
import {
  getFoods,
  deleteFood,
} from "@/services/foodService";
import type { Food } from "@/types/food";

const MODAL_ID = "create-food-modal";

export function DietFoodPage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] =
    useState<Food | null>(null);

  async function loadFoods() {
    try {
      const data = await getFoods();
      setFoods(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!selectedFood) return;

    await deleteFood(selectedFood.id);

    setSelectedFood(null);

    await loadFoods();
  }

  useEffect(() => {
    loadFoods();
  }, []);

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <SimpleHeader
        title="Dieta"
        subtitle="Gerencie seus alimentos"
      />

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="grid gap-4 mt-6">
          {foods.map((food) => (
            <div
              key={food.id}
              className="card bg-base-100 shadow-sm"
            >
              <div className="card-body">
                <h2 className="card-title">
                  {food.name}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <span>
                    🔥 {food.caloriesPer100g} kcal
                  </span>

                  <span>
                    🍞 {food.carbsPer100g} g
                  </span>

                  <span>
                    🍗 {food.proteinPer100g} g
                  </span>

                  <span>
                    🥑 {food.fatPer100g} g
                  </span>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() =>
                      setSelectedFood(food)
                    }
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className="btn btn-primary btn-circle btn-lg fixed bottom-6 right-6 shadow-lg z-50"
        onClick={() =>
          (
            document.getElementById(
              MODAL_ID
            ) as HTMLDialogElement
          )?.showModal()
        }
      >
        <Plus size={24} weight="bold" />
      </button>

      {selectedFood && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Excluir alimento
            </h3>

            <p className="py-4">
              Deseja realmente excluir
              <strong>
                {" "}
                {selectedFood.name}
              </strong>
              ?
            </p>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() =>
                  setSelectedFood(null)
                }
              >
                Cancelar
              </button>

              <button
                className="btn btn-error"
                onClick={handleDelete}
              >
                Excluir
              </button>
            </div>
          </div>
        </dialog>
      )}

      <AddFoodModal
        modalId={MODAL_ID}
        onCreated={loadFoods}
      />
    </div>
  );
}