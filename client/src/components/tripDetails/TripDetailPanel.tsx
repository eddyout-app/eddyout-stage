import { gql, useQuery } from "@apollo/client";

const GET_TRIP_BY_ID = gql`
  query GetTripById($id: ID!) {
    trip(id: $id) {
      _id
      riverName
      startDate
      endDate
      putIn
      takeOut
      crewNum
      organizerId
    }
  }
`;

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

      <div className="my-4">
        {view === "floatplan" && <div>🚣 Float Plan Component Here 🚣</div>}
        {view === "meals" && <div>🍽️ Meals Component Here 🍽️</div>}
        {view === "gear" && <div>🎒 Gear Component Here 🎒</div>}
        {view === "crew" && <div>👥 Crew Component Here 👥</div>}
        {view === "expenses" && <div>💰 Expenses Component Here 💰</div>}
      </div>

      <button
        onClick={onClose}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  );
}
