import { TripData } from "../../types/trip";

interface TripSummaryCardProps {
  trip: TripData;
  onClick: (tripId: string) => void;
}

export default function TripSummaryCard({
  trip,
  onClick: handleOpenDetail,
}: TripSummaryCardProps) {
  return (
    <div className="trip-row" onClick={() => handleOpenDetail(trip._id)}>
      <div className="trip-name">River: {trip.riverName}</div>
      <div className="trip-dates">
        {trip.startDate.toLocaleDateString()} →{" "}
        {trip.endDate.toLocaleDateString()}
      </div>
      <div className="trip-action">
        View Details <span className="arrow">→</span>
      </div>
    </div>
  );
}
