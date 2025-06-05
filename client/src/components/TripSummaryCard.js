export default function TripSummaryCard({ trip }) {
    return (<div className="trip-summary">
      <h2>River: {trip.riverName}</h2>
      <p>
        Start Date: {trip.startDate.toLocaleDateString()} to End Date:{" "}
        {trip.endDate.toLocaleDateString()}
      </p>
    </div>);
}
