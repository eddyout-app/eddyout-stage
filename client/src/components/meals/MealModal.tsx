import { useState } from "react";
import { useMutation } from "@apollo/client";
import { MealData } from "../../types/meals";
import { ADD_MEAL, UPDATE_MEAL } from "../../graphql/mutations/mealMutations";
import { GET_MEALS_BY_TRIP } from "../../graphql/queries/mealQueries";

import "../../styles/modal.css"; // ✅ GLOBAL modal styles

interface MealModalProps {
  meal: MealData;
  userId: string;
  isLeader: boolean;
  onClose: () => void;
  onSave: (updatedMeal: MealData) => void;
}

export default function MealModal({
  meal,
  userId,
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
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{meal.userId ? "Edit Meal" : "Claim Meal"}</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="form-group">
            <label htmlFor="mealName" className="form-label">
              What will you bring?
            </label>
            <input
              id="mealName"
              type="text"
              className="form-input"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
            />
          </div>

          <div className="modal-buttons">
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
