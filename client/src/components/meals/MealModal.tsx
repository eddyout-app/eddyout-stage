import { useState } from "react";
import { useMutation } from "@apollo/client";
import { MealData } from "../../types/meals";
import { CLAIM_MEAL, UPDATE_MEAL } from "../../graphql/mutations/mealMutations";

interface MealModalProps {
  meal: MealData;
  userId: string;
  fullName: string;
  isLeader: boolean;
  onClose: () => void;
  onSave: (updatedMeal: MealData) => void;
}

export default function MealModal({
  meal,
  userId,
  fullName,
  isLeader,
  onClose,
  onSave,
}: MealModalProps) {
  const [mealName, setMealName] = useState(meal.mealName || "");

  const [claimMeal] = useMutation(CLAIM_MEAL);
  const [updateMeal] = useMutation(UPDATE_MEAL);

  const handleSave = async () => {
    try {
      if (meal._id.startsWith("unclaimed")) {
        await claimMeal({
          variables: {
            mealId: meal._id,
            userId: userId,
            mealName: mealName,
          },
        });
      } else {
        await updateMeal({
          variables: {
            mealId: meal._id,
            userId: userId,
            mealName: mealName,
          },
        });
      }

      // Optional: update local UI immediately
      const updatedMeal: MealData = {
        ...meal,
        mealName: mealName,
        userId: {
          _id: userId,
          fullName: fullName,
        },
      };

      onSave(updatedMeal);
      onClose();
    } catch (err) {
      console.error("Error saving meal:", err);
    }
  };

  const canEdit =
    isLeader ||
    (meal.userId && meal.userId._id === userId) ||
    meal.userId === null;

  if (!canEdit) {
    return null; // Not allowed to edit this meal
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-header mb-4">
          {meal.userId ? "Edit Meal" : "Claim Meal"}
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">What will you bring?</label>
          <input
            type="text"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-primary"
            // disabled={loading}
          >
            {meal.userId ? "Save Changes" : "Claim Meal"}
          </button>
        </div>
        {/* 
        {error && <p className="text-red-500 mt-2">Error saving meal.</p>} */}
      </div>
    </div>
  );
}
