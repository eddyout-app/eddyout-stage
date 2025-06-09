import CampsitesSection from "../campsites/CampsitesSection";
import MealSection from "../meals/MealSection";
import SidePanel from "../SidePanel";
import { TripData } from "../../types/trip";
import { UserData } from "../../types/user";
import CrewSection from "../crew/CrewSection";
import ExpensesSection from "../expenses/ExpensesSection";
import GearSection from "../gear/GearSection";

interface TripDetailPanelProps {
  trip: TripData;
  user: UserData;
  view: string;
  onClose: () => void;
  onViewChange: (viewName: string) => void;
}

export default function TripDetailPanel({
  trip,
  user,
  view,
  onClose,
  onViewChange,
}: TripDetailPanelProps) {
  const startDateFormatted = new Date(trip.startDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const endDateFormatted = new Date(trip.endDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="trip-detail-panel">
      <h2>Trip Details: {trip.riverName}</h2>
      <p>
        Dates: {startDateFormatted} to {endDateFormatted}
      </p>
      <p>
        Put In: {trip.putIn} | Take Out: {trip.takeOut} | Crew Size:{" "}
        {trip.crewNum}
      </p>

      <div className="trip-detail-buttons">
        <div className="trip-detail-buttons-left">
          <button
            className="btn-secondary"
            onClick={() => onViewChange("campsites")}
          >
            Campsites
          </button>
          <button
            className="btn-secondary"
            onClick={() => onViewChange("meals")}
          >
            Meals
          </button>
          <button
            className="btn-secondary"
            onClick={() => onViewChange("gear")}
          >
            Gear
          </button>
          <button
            className="btn-secondary"
            onClick={() => onViewChange("crew")}
          >
            Crew
          </button>
          <button
            className="btn-secondary"
            onClick={() => onViewChange("expenses")}
          >
            Expenses
          </button>
        </div>

        <SidePanel isOpen={!!view} onClose={onClose}>
          {view === "meals" && <MealSection trip={trip} user={user} />}
          {view === "campsites" && <CampsitesSection trip={trip} user={user} />}
          {view === "gear" && <GearSection trip={trip} user={user} />}
          {view === "crew" && <CrewSection trip={trip} user={user} />}
          {view === "expenses" && <ExpensesSection trip={trip} user={user} />}
        </SidePanel>

        <button onClick={onClose} className="btn-secondary">
          Close
        </button>
      </div>
    </div>
  );
}
