import { useState } from "react";
import { useMutation } from "@apollo/client";
import { MealData } from "../../types/meals";
import { ADD_MEAL, UPDATE_MEAL } from "../../graphql/mutations/mealMutations";
import { GET_MEALS_BY_TRIP } from "../../graphql/queries/mealQueries";

interface MealModalProps {
  meal: MealData;
  userId: string;
  // fullName: string;
  isLeader: boolean;
  onClose: () => void;
  onSave: (updatedMeal: MealData) => void;
}

export default function MealModal({
  meal,
  userId,
  // fullName,
  isLeader,
  onClose,
  onSave,
}: MealModalProps) {
  const [mealName, setMealName] = useState(meal.mealName || "");

  const [updateMeal] = useMutation(UPDATE_MEAL);
  const [addMeal] = useMutation(ADD_MEAL);

  const handleSave = async () => {
    try {
      let updatedMeal: MealData;

      if (meal._id.startsWith("unclaimed")) {
        const result = await addMeal({
          variables: {
            tripId: meal.tripId,
            date: meal.date,
            mealType: meal.mealType,
            userId: userId,
            mealName: mealName,
          },
          refetchQueries: [
            {
              query: GET_MEALS_BY_TRIP,
              variables: { tripId: meal.tripId },
            },
          ],
        });

        console.log("AddMeal result:", result.data);

        updatedMeal = result.data.addMeal;
      } else {
        const result = await updateMeal({
          variables: {
            mealId: meal._id,
            userId: userId,
            mealName: mealName,
          },
          refetchQueries: [
            {
              query: GET_MEALS_BY_TRIP,
              variables: { tripId: meal.tripId },
            },
          ],
        });

        console.log("UpdateMeal result:", result.data);

        updatedMeal = result.data.updateMeal;
      }

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
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-header mb-4">
          {meal.userId ? "Edit Meal" : "Claim Meal"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              What will you bring?
            </label>
            <input
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {meal.userId ? "Save Changes" : "Claim Meal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
