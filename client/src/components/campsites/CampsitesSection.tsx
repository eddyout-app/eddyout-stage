import { useQuery } from "@apollo/client";
import { GET_CAMPSITES } from "../../graphql/queries/campsitesQueries";
import { TripData } from "../../types/trip";
import { UserData } from "../../types/user";
import { CampsiteData } from "../../types/campsites";
import CampsiteSchedule from "./CampsiteSchedule";

interface CampsitesProps {
  trip: TripData;
  user: UserData;
}

export default function Campsites({ trip, user }: CampsitesProps) {
  const { data, loading, error } = useQuery(GET_CAMPSITES, {
    variables: { tripId: trip._id },
    skip: !trip._id,
  });

  const campsites: CampsiteData[] = data?.campsites || [];

  if (loading) {
    return (
      <div className="text-center mt-10 text-textBody font-body text-lg">
        Loading campsite schedule...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 font-body text-lg">
        Error loading campsites: {error.message}
      </div>
    );
  }

  return (
    <div className="bg-light-neutral min-h-screen py-10 px-4 font-body text-textBody">
      <h2 className="text-2xl font-header text-primary mb-4 text-center">
        Campsite Schedule for {trip.riverName}
      </h2>

      <div className="floatplan-content">
        {campsites.map((campsite) => (
          <CampsiteSchedule
            key={campsite._id}
            date={new Date(campsite.startDate)}
            location={campsite.name}
            latitude={campsite.location.latitude}
            longitude={campsite.location.longitude}
            weather={campsite.weather}
            // TODO: add onLocationChange and onSave with mutations when ready
          />
        ))}
      </div>
    </div>
  );
}
