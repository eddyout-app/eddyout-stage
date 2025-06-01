import { useQuery } from "@apollo/client";
import { GET_MEALS_BY_TRIP } from "../../graphql/meals/queries";
import { TripData } from "../../types/trip";
import { MealData } from "../../types/meals";
import MealModal from "./MealModal";
import { useState } from "react";

interface MealSectionProps {
  trip: TripData;
}

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner"] as const;

export default function MealSection({ trip }: MealSectionProps) {
  const { data, loading, error } = useQuery(GET_MEALS_BY_TRIP, {
    variables: { tripId: trip._id },
  });
  // Remove the three lines above this and uncomment the following 3 lines when backend is ready
  //   const { data, loading, error, refetch } = useQuery(GET_MEALS_BY_TRIP, {
  //   variables: { tripId: trip._id },
  // });
  const userId = localStorage.getItem("userId") || "";
  const fullName = localStorage.getItem("fullName") || "";
  const [editMeal, setEditMeal] = useState<MealData | null>(null);

  const getMealDates = (startDate: Date, endDate: Date): Date[] => {
    const dates: Date[] = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-textBody font-body text-lg">
        Loading...
      </div>
    );
  }

  if (error || !data?.mealsByTrip) {
    return (
      <div className="text-center mt-10 text-red-500 font-body text-lg">
        Error loading meals.
      </div>
    );
  }

  const meals: MealData[] = data.mealsByTrip;
  const mealsByDate: Record<string, MealData[]> = {};

  meals.forEach((meal) => {
    const dateKey = new Date(meal.date).toDateString();
    if (!mealsByDate[dateKey]) mealsByDate[dateKey] = [];
    mealsByDate[dateKey].push(meal);
  });

  const tripDates = getMealDates(
    new Date(trip.startDate),
    new Date(trip.endDate)
  );

  return (
    <div className="bg-light-neutral min-h-screen py-10 px-4 font-body text-textBody">
      <h1 className="text-4xl font-header text-primary mb-6 text-center">
        Meal Plan
      </h1>

      <div className="overflow-y-auto max-h-[80vh] pr-2 mx-auto">
        {tripDates.map((date, i) => {
          const dayMeals = mealsByDate[date.toDateString()] || [];

          return (
            <div key={date.toISOString()} className="mb-10">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-primary">
                  {date.getTime() === new Date(trip.endDate).getTime()
                    ? "Last Day"
                    : `Day ${i + 1}`}
                </h2>
                <p className="text-lg text-gray-600">{date.toDateString()}</p>
              </div>

              {/* Grid header */}
              <div className="grid grid-cols-4 gap-4 items-center text-center font-semibold mb-2 border-b border-gray-400 pb-2">
                <div>Meal Type</div>
                <div>Meal Name</div>
                <div>Assigned To</div>
                <div>Action</div>
              </div>

              {MEAL_TYPES.map((mealType) => {
                const existingMeal = dayMeals.find(
                  (meal) => meal.mealType === mealType
                );

                const mealToRender: MealData = existingMeal || {
                  _id: `unclaimed-${date.toISOString()}-${mealType}`,
                  mealType,
                  mealName: "",
                  tripId: trip._id,
                  date: date.toISOString(),
                  userId: null,
                };

                return (
                  <div
                    key={`${date.toISOString()}-${mealType}`}
                    className="grid grid-cols-4 gap-4 items-center text-center py-2 border-b border-gray-200"
                  >
                    {/* Meal Type */}
                    <div>{mealToRender.mealType}</div>

                    {/* Meal Name */}
                    <div>
                      {mealToRender.userId ? mealToRender.mealName : "—"}
                    </div>

                    {/* Assigned To */}
                    <div>
                      {mealToRender.userId
                        ? mealToRender.userId.fullName
                        : "Unclaimed"}
                    </div>

                    {/* Action */}
                    <div>
                      <button
                        className="btn-action"
                        onClick={() => setEditMeal(mealToRender)}
                      >
                        {mealToRender.userId ? "Edit" : "Claim"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {editMeal && (
        <MealModal
          meal={editMeal}
          userId={userId}
          fullName={fullName}
          isLeader={false}
          onClose={() => setEditMeal(null)}
          onSave={(updatedMeal) => {
            // For now → update UI locally
            console.log("Updated meal:", updatedMeal);
            // Uncomment the following line when backend is ready
            // await refetch();
            setEditMeal(null);
          }}
        />
      )}
    </div>
  );
}
