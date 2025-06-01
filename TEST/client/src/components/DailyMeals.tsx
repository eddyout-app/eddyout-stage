import React from "react";
import { MealData } from "../interfaces/MealData";

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner"] as const;

interface DailyMealsProps {
  date: Date;
  meal: MealData;
  index: number;
  endDate: Date;
  onMealChange?: (field: keyof MealData, value: string) => void;
}

const DailyMeals: React.FC<DailyMealsProps> = ({
  // date,
  meal,
  // index,
  // endDate,
  onMealChange,
}) => {
  return (
    <div className="schedule-day-container">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 w-full mb-2">
        <label className="font-semibold self-start sm:self-center">Meal:</label>
        {onMealChange ? (
          <select
            value={meal.mealType || ""}
            onChange={(e) => onMealChange("mealType", e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Which Meal --</option>
            {MEAL_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        ) : (
          <span className="inline-block w-full sm:w-auto border border-transparent rounded-md px-3 py-2 text-gray-900">
            {meal.mealType || "—"}
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 w-full mb-2">
        <label className="font-semibold self-start sm:self-center">
          What are we eating?
        </label>
        {onMealChange ? (
          <input
            type="text"
            value={meal.mealName || ""}
            onChange={(e) => onMealChange("mealName", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          meal.mealName || ""
        )}
      </div>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 w-full mb-2">
        <label className="font-semibold self-start sm:self-center">
          Who is bringing it?{" "}
        </label>
        {onMealChange ? (
          <input
            type="text"
            value={meal.crewMember || ""}
            onChange={(e) => onMealChange("crewMember", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          meal.crewMember || ""
        )}
      </div>
    </div>
  );
};

export default DailyMeals;
