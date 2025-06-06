import { useQuery } from "@apollo/client";
import { GET_MEALS_BY_TRIP } from "../../graphql/queries/mealQueries";
import { MealData } from "../../types/meals";
import MealModal from "./MealModal";
import { useState } from "react";
import { TripData } from "../../types/trip";
import { UserData } from "../../types/user";

interface MealSectionProps {
  trip: TripData;
  user: UserData;
}

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner"] as const;

export default function MealSection({ trip, user }: MealSectionProps) {
  const { data, loading, error, refetch } = useQuery(GET_MEALS_BY_TRIP, {
    variables: { tripId: trip._id },
    skip: !trip._id,
  });

  const [editMeal, setEditMeal] = useState<MealData | null>(null);
  const meals: MealData[] = data?.mealsByTrip || [];

  const getMealDates = (startDate: Date, endDate: Date): Date[] => {
    const dates: Date[] = [];

    // Normalize to UTC midnight
    const currentDate = new Date(
      Date.UTC(
        startDate.getUTCFullYear(),
        startDate.getUTCMonth(),
        startDate.getUTCDate()
      )
    );

    const endUtcDate = new Date(
      Date.UTC(
        endDate.getUTCFullYear(),
        endDate.getUTCMonth(),
        endDate.getUTCDate()
      )
    );

    while (currentDate <= endUtcDate) {
      dates.push(new Date(currentDate));
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    return dates;
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-textBody font-body text-lg">
        Loading meals...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 font-body text-lg">
        Error loading meals: {error.message}
      </div>
    );
  }

  const mealsByDateAndType: Record<string, Record<string, MealData>> = {};

  meals.forEach((meal) => {
    const dateKey = new Date(Number(meal.date)).toISOString().split("T")[0];
    if (!mealsByDateAndType[dateKey]) mealsByDateAndType[dateKey] = {};
    mealsByDateAndType[dateKey][meal.mealType] = meal;
  });

  console.log("Meals by date and type:", mealsByDateAndType);

  // console.log("Fetched meals:", meals);
  // console.log("Meals by date:", mealsByDate);

  const tripDates = getMealDates(
    new Date(trip.startDate),
    new Date(trip.endDate)
  );
  console.log(
    "Trip Dates ISO:",
    tripDates.map((d) => d.toISOString())
  );
  console.log(
    "Meal Dates in data:",
    meals.map((m) => m.date)
  );

  return (
    <div className="bg-light-neutral min-h-screen py-10 px-4 font-body text-textBody">
      <h1 className="text-4xl font-header text-primary mb-6 text-center">
        Meal Plan
      </h1>

      <div className="overflow-y-auto max-h-[80vh] pr-2 mx-auto">
        {tripDates.map((date, i) => {
          const dateKey = date.toISOString().split("T")[0];
          // const dayMeals = mealsByDate[dateKey] || [];

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
                const existingMeal =
                  mealsByDateAndType[dateKey]?.[mealType] ?? null;

                const mealToRender: MealData = existingMeal || {
                  _id: `unclaimed-${date.toISOString()}-${mealType}`,
                  mealType,
                  mealName: "",
                  tripId: trip._id,
                  date: date.toISOString(),
                  userId: null,
                };

                const userIdObj = mealToRender.userId as {
                  _id: string;
                  fullName: string;
                } | null;

                const assignedName = !mealToRender.userId
                  ? "Unclaimed"
                  : userIdObj && userIdObj._id === user._id
                  ? "You"
                  : userIdObj?.fullName ?? "Claimed";

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
                    <div>{assignedName}</div>

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
          userId={user._id}
          // fullName={user.firstname ?? user.email}
          isLeader={false}
          onClose={() => setEditMeal(null)}
          onSave={async (updatedMeal) => {
            console.log("Updated meal:", updatedMeal);
            await refetch();
            setEditMeal(null);
          }}
        />
      )}
    </div>
  );
}
