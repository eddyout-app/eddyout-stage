import { useQuery } from "@apollo/client";
import { GET_CAMPSITES } from "../../graphql/queries/campsitesQueries";
import { TripData } from "../../types/trip";
import { UserData } from "../../types/user";
import { CampsiteData } from "../../types/campsites";
import { useState } from "react";
import CampsiteModal from "./CampsiteModal";

// Import global Sections styles
import "../../styles/sections.css";

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
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Loading campsite schedule...
      </p>
    );
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
        Error loading campsites: {error.message}
      </p>
    );
  }

  const campsitesByDate: Record<string, CampsiteData> = {};

  campsites.forEach((campsite) => {
    const dateKey = campsite.startDate.split("T")[0];
    campsitesByDate[dateKey] = campsite;
  });

  const tripDates = getTripDates(
    new Date(trip.startDate),
    new Date(trip.endDate)
  );

  return (
    <div className="section-container">
      <h1>Campsite Schedule</h1>

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

        const formattedDate = date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        return (
          <div key={date.toISOString()} className="section-block">
            {/* One-line Day + Date */}
            <div className="section-day-header">
              <span className="day-number">
                {date.getTime() === new Date(trip.endDate).getTime()
                  ? "Last Day"
                  : `Day ${i + 1}`}
              </span>
              <span className="day-date">— {formattedDate}</span>
            </div>

            {/* Grid Header */}
            <div className="section-data-label-row">
              <div className="section-data-label">Campsite Location</div>
              {user._id === trip.organizerId && (
                <div className="section-data-label">Action</div>
              )}
            </div>

            {/* Grid Data */}
            <div className="section-data-grid">
              <div>
                {campsiteToRender.name ? campsiteToRender.name : "Unassigned"}
              </div>
              {user._id === trip.organizerId && (
                <div className="section-action">
                  <button
                    className="btn-secondary"
                    onClick={() => setEditCampsite(campsiteToRender)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {editCampsite && (
        <CampsiteModal
          campsite={editCampsite}
          isLeader={user._id === trip.organizerId}
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
