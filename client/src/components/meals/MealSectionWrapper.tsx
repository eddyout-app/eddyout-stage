import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TRIP_BY_ID } from "../../graphql";
import MealSection from "./MealSection";
import { TripData } from "../../types/trip";

export default function MealSectionWrapper() {
  const { tripId } = useParams<{ tripId: string }>();

  const { data, loading, error } = useQuery<{ trip: TripData }>(
    GET_TRIP_BY_ID,
    {
      variables: { id: tripId },
    }
  );

  if (loading) {
    return <div className="text-center mt-10">Loading trip data...</div>;
  }

  if (error || !data?.trip) {
    return (
      <div className="text-center mt-10 text-red-500">
        Error loading trip data.
      </div>
    );
  }

  return <MealSection trip={data.trip} />;
}
