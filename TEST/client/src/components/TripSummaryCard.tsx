import { TripData } from "../interfaces/TripData";

export default function TripSummaryCard({ trip }: { trip: TripData }) {
  return (
    <div className="trip-summary">
      <h2>River: {trip.riverName}</h2>
      <p>
        Start Date: {trip.startDate.toLocaleDateString()} to End Date:{" "}
        {trip.endDate.toLocaleDateString()}
      </p>
    </div>
  );
}
