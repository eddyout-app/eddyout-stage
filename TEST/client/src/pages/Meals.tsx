import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import DailyMeals from "../components/DailyMeals";
import { TripData } from "../interfaces/TripData";
import { MealData } from "../interfaces/MealData";

export default function Meals() {
  const { trip } = useOutletContext<{ trip: TripData }>();
  const [meals, setMeals] = useState<MealData[][]>([]);

  const defaultMeal: MealData = {
    id: null,
    mealType: "",
    mealName: "",
    crewMember: "",
    tripId: "",
  };

  function getMealDates(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  useEffect(() => {
    if (trip) {
      const numDays = getMealDates(trip.startDate, trip.endDate).length;

      const mealsWithTripId = Array(numDays)
        .fill(null)
        .map(() => [
          { ...defaultMeal, mealType: "Breakfast", tripId: trip.id },
          { ...defaultMeal, mealType: "Lunch", tripId: trip.id },
          { ...defaultMeal, mealType: "Dinner", tripId: trip.id },
        ]);

      setMeals(mealsWithTripId);
    }
  }, [trip]);

  if (!trip) {
    return (
      <div className="text-center mt-10 text-textBody font-body text-lg">
        Loading...
      </div>
    );
  }

  const tripDates = getMealDates(trip.startDate, trip.endDate);

  return (
    <div className="bg-light-neutral min-h-screen py-10 px-4 font-body text-textBody">
      <h1 className="text-4xl font-header text-primary mb-6 text-center">
        Meal Plan
      </h1>

      <div className="overflow-y-auto max-h-[80vh] pr-2 mx-auto">
        {" "}
        {tripDates.map((date, i) => (
          <div key={date.toISOString()} className="mb-6">
            <div className="text-center mb-2">
              <h2 className="schedule-day-title">
                {date.getTime() === trip.endDate.getTime()
                  ? "Last Day"
                  : `Day ${i + 1}`}
              </h2>
              <h2 className="schedule-day-date">{date.toDateString()}</h2>
            </div>
            {meals[i]?.map((meal, j) => (
              <DailyMeals
                key={`${date.toISOString()}-${meal.mealType}-${j}`}
                date={date}
                index={i + 1}
                endDate={trip.endDate}
                meal={meal}
                onMealChange={(field, value) => {
                  const updated = [...meals];
                  updated[i][j] = {
                    ...meals[i][j],
                    [field]: value,
                  };
                  setMeals(updated);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
