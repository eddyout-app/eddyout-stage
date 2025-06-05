import CampsitesSection from "../campsites/CampsitesSection";
import MealSection from "../meals/MealSection";
import SidePanel from "../SidePanel";
import GearSection from "../gear/GearSection";
import { TripData } from "../../types/trip";
import { UserData } from "../../types/user";

interface TripDetailPanelProps {
  trip: TripData;
  user: UserData;
  view: string;
  onClose: () => void;
}

export default function TripDetailPanel({
  trip,
  user,
  view,
  onClose,
}: TripDetailPanelProps) {
  console.log("TripDetailPanel trip prop:", trip);
  console.log("TripDetailPanel view:", view);

  return (
    <div className="trip-detail-panel p-4 border-t border-gray-300">
      <h2 className="text-xl mb-2">Trip Details: {trip.riverName}</h2>
      <p>
        Dates: {trip.startDate.toString()} - {trip.endDate.toString()}
      </p>
      <p>
        Put In: {trip.putIn} | Take Out: {trip.takeOut} | Crew Size:{" "}
        {trip.crewNum}
      </p>

      <SidePanel isOpen={!!view} onClose={onClose}>
        {view === "meals" && <MealSection trip={trip} user={user} />}
        {view === "campsites" && <CampsitesSection trip={trip} user={user} />}
        {view === "gear" && <GearSection trip={trip} user={user} />}
        {/* {view === "crew" && <CrewSection trip={trip} user={user}/>}
        {view === "expenses" && <ExpensesSection trip={trip} user={user}/>} */}
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
