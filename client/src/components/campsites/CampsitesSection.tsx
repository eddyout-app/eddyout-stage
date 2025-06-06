import { useQuery } from "@apollo/client";
import { GET_CAMPSITES } from "../../graphql/queries/campsitesQueries";
import { TripData } from "../../types/trip";
import { UserData } from "../../types/user";
import { CampsiteData } from "../../types/campsites";
import { useState } from "react";
import CampsiteModal from "./CampsiteModal";

interface CampsitesProps {
  trip: TripData;
  user: UserData;
}

export default function Campsites({ trip, user }: CampsitesProps) {
  const { data, loading, error, refetch } = useQuery(GET_CAMPSITES, {
    variables: { tripId: trip._id },
    skip: !trip._id,
  });

  const [editCampsite, setEditCampsite] = useState<CampsiteData | null>(null);
  const campsites: CampsiteData[] = data?.campsites || [];

  const getTripDates = (startDate: Date, endDate: Date): Date[] => {
    const dates: Date[] = [];

    // Normalize to UTC midnight
    const currentDate = new Date(
      Date.UTC(
        startDate.getUTCFullYear(),
        startDate.getUTCMonth(),
        startDate.getUTCDate()
      )
    );

    const endUtcDate = new Date(
      Date.UTC(
        endDate.getUTCFullYear(),
        endDate.getUTCMonth(),
        endDate.getUTCDate()
      )
    );

    while (currentDate <= endUtcDate) {
      dates.push(new Date(currentDate));
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    return dates;
  };

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

  const campsitesByDate: Record<string, CampsiteData> = {};

  campsites.forEach((campsite) => {
    const dateKey = campsite.startDate.split("T")[0]; // no new Date(), no risk!
    campsitesByDate[dateKey] = campsite;
  });

  const tripDates = getTripDates(
    new Date(trip.startDate),
    new Date(trip.endDate)
  );

  return (
    <div className="bg-light-neutral min-h-screen py-10 px-4 font-body text-textBody">
      <h1 className="text-4xl font-header text-primary mb-6 text-center">
        Campsite Schedule
      </h1>

      <div className="overflow-y-auto max-h-[80vh] pr-2 mx-auto">
        {tripDates.map((date, i) => {
          const dateKey = date.toISOString().split("T")[0];
          const existingCampsite = campsitesByDate[dateKey];
          const campsiteToRender: CampsiteData = existingCampsite || {
            _id: `unassigned-${date.toISOString()}`,
            tripId: trip._id,
            startDate: date.toISOString(),
            name: "",
            location: {
              latitude: 0,
              longitude: 0,
            },
            weather: undefined,
          };

          return (
            <div key={date.toISOString()} className="mb-10">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-primary">
                  {date.getTime() === new Date(trip.endDate).getTime()
                    ? "Last Day"
                    : `Day ${i + 1}`}
                </h2>
                <p className="text-lg text-gray-600">{date.toDateString()}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center text-center py-2 border-b border-gray-200">
                <div>Campsite Location</div>
                {/* <div>Latitude / Longitude</div> */}
                <div>Action</div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center text-center py-2 border-b border-gray-200">
                {/* Campsite Location */}
                <div>
                  {campsiteToRender.name ? campsiteToRender.name : "Unassigned"}
                </div>

                {/* Lat / Lon */}
                {/* <div>
                  {campsiteToRender.location.latitude},{" "}
                  {campsiteToRender.location.longitude}
                </div> */}

                {/* Action */}
                <div>
                  <button
                    className="btn-action"
                    onClick={() => setEditCampsite(campsiteToRender)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {editCampsite && (
        <CampsiteModal
          campsite={editCampsite}
          isLeader={user._id === trip.organizerId} // adjust as needed
          onClose={() => setEditCampsite(null)}
          onSave={async (updatedCampsite) => {
            console.log("Updated campsite:", updatedCampsite);
            await refetch();
            setEditCampsite(null);
          }}
        />
      )}
    </div>
  );
}
