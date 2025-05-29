import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ScheduleDay from "../components/ScheduleDay";
import { TripData } from "../interfaces/TripData";
import { fetchScheduleForTrip } from "../api/scheduleAPI";
import { toDateOnlyString } from "../utils/transformTrip";
import { createScheduleItem, updateScheduleItem } from "../api/scheduleAPI";

export default function FloatPlan() {
  const { trip } = useOutletContext<{ trip: TripData }>();
  const [locations, setLocations] = useState<
    {
      location: string;
      tripId: string;
      date: string;
      isSaved: boolean;
      id?: string;
    }[]
  >([]);

  function getTripDates(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  useEffect(() => {
    async function loadSchedule() {
      if (!trip?.id) return;

      try {
        const tripDates = getTripDates(trip.startDate, trip.endDate);
        const schedule = await fetchScheduleForTrip(trip.id);

        const filled = tripDates.map((date) => {
          const formattedTripDate = toDateOnlyString(date);

          const item = schedule.find((s) => {
            const formattedScheduleDate = toDateOnlyString(s.date);
            return formattedScheduleDate === formattedTripDate;
          });

          return {
            location: item?.campsite || "",
            tripId: trip.id,
            date: formattedTripDate,
            isSaved: Boolean(item?.campsite),
            id: item?.id,
          };
        });

        setLocations(filled);
      } catch (err) {
        console.error("Error loading schedule:", err);
      }
    }

    loadSchedule();
  }, [trip]);

  if (!trip) {
    return (
      <div className="text-center mt-10 text-textBody font-body text-lg">
        Loading...
      </div>
    );
  }

  const tripDates = getTripDates(trip.startDate, trip.endDate);

  return (
    <div className="bg-light-neutral min-h-screen py-10 px-4 font-body text-textBody">
      <h1 className="text-4xl font-header text-primary mb-6 text-center">
        Campsite Schedule
      </h1>

      <div className="floatplan-content">
        {tripDates.map((date, i) => (
          <ScheduleDay
            key={date.toISOString()}
            date={date}
            index={i + 1}
            endDate={trip.endDate}
            location={locations[i]?.location || ""}
            isSaved={locations[i]?.isSaved}
            onLocationChange={(newLoc) => {
              const updated = [...locations];
              updated[i] = {
                ...updated[i],
                location: newLoc,
                isSaved: false, // mark as edited
              };
              setLocations(updated);
            }}
            onSave={async () => {
              const entry = locations[i];
              try {
                if (entry.id) {
                  await updateScheduleItem(entry.id, {
                    campsite: entry.location,
                  });

                  const updated = [...locations];
                  updated[i] = { ...updated[i], isSaved: true };
                  setLocations(updated);
                } else {
                  const newItem = await createScheduleItem({
                    campsite: entry.location,
                    tripId: entry.tripId,
                    date: entry.date,
                  });

                  const updated = [...locations];
                  updated[i] = {
                    ...updated[i],
                    id: newItem.id,
                    isSaved: true,
                  };
                  setLocations(updated);
                }
              } catch (err) {
                console.error("Error saving schedule item:", err);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
