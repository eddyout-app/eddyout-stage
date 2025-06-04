import { TripData } from "../../types/trip";

interface TripSummaryCardProps {
  trip: TripData;
  onClick: () => void;
}

export default function TripSummaryCard({
  trip,
  onClick,
}: TripSummaryCardProps) {
  return (
    <div className="trip-summary">
      <h2>
        <button
          onClick={onClick}
          className="text-primary hover:underline text-xl font-bold"
        >
          River: {trip.riverName}
        </button>
      </h2>
      <p>
        Start Date: {trip.startDate.toLocaleDateString()} to End Date:{" "}
        {trip.endDate.toLocaleDateString()}
      </p>
    </div>
  );
}
