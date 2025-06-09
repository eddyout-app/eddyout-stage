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
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Loading meal plan...
      </p>
    );
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
        Error loading meals: {error.message}
      </p>
    );
  }

  const mealsByDateAndType: Record<string, Record<string, MealData>> = {};

  meals.forEach((meal) => {
    const dateKey = new Date(Number(meal.date)).toISOString().split("T")[0];
    if (!mealsByDateAndType[dateKey]) mealsByDateAndType[dateKey] = {};
    mealsByDateAndType[dateKey][meal.mealType] = meal;
  });

  const tripDates = getMealDates(
    new Date(trip.startDate),
    new Date(trip.endDate)
  );

  return (
    <div className="section-container">
      <h1>Meal Plan</h1>

      {tripDates.map((date, i) => {
        const dateKey = date.toISOString().split("T")[0];

        // 👉 Format date as: "Saturday, July 5, 2025"
        const formattedDate = date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        return (
          <div key={date.toISOString()} className="section-block">
            {/* Day header */}
            <div className="section-day-header">
              <span className="day-number">
                {date.getTime() === new Date(trip.endDate).getTime()
                  ? "Last Day"
                  : `Day ${i + 1}`}
              </span>
              <span className="day-date">— {formattedDate}</span>
            </div>

            <div className="planner-grid">
              <div className="planner-grid-header">
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
                    className="planner-grid-row"
                  >
                    <div>{mealToRender.mealType}</div>
                    <div>
                      {mealToRender.userId ? mealToRender.mealName : "—"}
                    </div>
                    <div>{assignedName}</div>
                    <div>
                      {/* New "inline-action" instead of button */}
                      <div
                        className="inline-action"
                        onClick={() => setEditMeal(mealToRender)}
                      >
                        {mealToRender.userId ? "Edit" : "Claim"}{" "}
                        <span className="arrow">→</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {editMeal && (
        <MealModal
          meal={editMeal}
          userId={user._id}
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
