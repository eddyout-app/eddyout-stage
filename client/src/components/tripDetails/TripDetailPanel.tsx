import { useQuery } from "@apollo/client";
import { GET_TRIP_BY_ID } from "../../graphql";
import Campsites from "../campsites/Campsites";
import MealSection from "../meals/MealSection";
import SidePanel from "../SidePanel";

interface TripDetailPanelProps {
  tripId: string;
  view: string;
  onClose: () => void;
}

export default function TripDetailPanel({
  tripId,
  view,
  onClose,
}: TripDetailPanelProps) {
  const { data, loading, error } = useQuery(GET_TRIP_BY_ID, {
    variables: { id: tripId },
  });

  const trip = data?.trip;

  if (loading) {
    return <div className="trip-detail-panel">Loading trip details...</div>;
  }

  if (error) {
    return (
      <div className="trip-detail-panel">
        Error loading trip: {error.message}
      </div>
    );
  }

  if (!trip) {
    return <div className="trip-detail-panel">Trip not found.</div>;
  }

  return (
    <div className="trip-detail-panel p-4 border-t border-gray-300">
      <h2 className="text-xl mb-2">Trip Details: {trip.riverName}</h2>
      <p>
        Dates: {trip.startDate} - {trip.endDate}
      </p>
      <p>
        Put In: {trip.putIn} | Take Out: {trip.takeOut} | Crew Size:{" "}
        {trip.crewNum}
      </p>

      <SidePanel isOpen={!!view} onClose={onClose}>
        {view === "meals" && <MealSection trip={trip} />}
        {view === "campsites" && <Campsites trip={trip} />}
        {/* {view === "gear" && <GearSection trip={trip} />}
        {view === "crew" && <CrewSection trip={trip} />}
        {view === "expenses" && <ExpensesSection trip={trip} />} */}
      </SidePanel>

      <button
        onClick={onClose}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  );
}
