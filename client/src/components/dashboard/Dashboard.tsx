// Dashboard.tsx

import { useState } from "react";
import { TripData } from "../../types/trip";
import TripSummaryCard from "../../components/tripDetails/TripSummaryCard";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import TripDetailPanel from "../../components/tripDetails/TripDetailPanel";
import { useQuery } from "@apollo/client";
import { GET_ALL_TRIPS } from "../../graphql";

export default function Dashboard() {
  const { data, loading, error } = useQuery<{ trips: TripData[] }>(
    GET_ALL_TRIPS
  );

  const trips = (data?.trips ?? []).map((trip) => ({
    ...trip,
    startDate: new Date(trip.startDate),
    endDate: new Date(trip.endDate),
  }));

  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [selectedDetailView, setSelectedDetailView] = useState<string | null>(
    null
  );

  function handleOpenDetail(tripId: string, detailView: string) {
    setSelectedTripId(tripId);
    setSelectedDetailView(detailView);
  }

  function clearSelectedTrip() {
    setSelectedTripId(null);
    setSelectedDetailView(null);
  }

  if (loading) {
    return (
      <>
        <Nav />
        <div className="text-center mt-10 text-textBody font-body text-lg">
          Loading trips...
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Nav />
        <div className="text-center mt-10 text-textBody font-body text-lg">
          Error loading trips: {error.message}
        </div>
        <Footer />
      </>
    );
  }

  if (trips.length === 0) {
    return (
      <>
        <Nav />
        <div className="text-center mt-10 text-textBody font-body text-lg">
          You have not created any trips yet.
        </div>
        <Footer />
      </>
    );
  }

  const now = new Date();

  const futureTrips = trips.filter((trip) => trip.startDate > now);
  const pastTrips = trips.filter((trip) => trip.endDate < now);
  const currentTrips = trips.filter(
    (trip) => trip.startDate <= now && trip.endDate >= now
  );

  const mostCurrentTrip = [...currentTrips, ...futureTrips].sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  )[0];

  const filteredFutureTrips = futureTrips.filter(
    (t) => t._id !== mostCurrentTrip?._id
  );
  const filteredPastTrips = pastTrips.filter(
    (t) => t._id !== mostCurrentTrip?._id
  );

  return (
    <div className="h-screen w-screen">
      <Nav />
      <main>
        <div className="dashboard-page">
          <h1>Trip Dashboard</h1>
          <p className="description">
            Here is a list of all available trips. Click each one to see more
            details or assign yourself to a crew or a task.
          </p>

          {mostCurrentTrip && (
            <section className="dashboard-section">
              <h2>Most Current Trip</h2>
              <div key={mostCurrentTrip._id} className="trip-card">
                <TripSummaryCard
                  trip={mostCurrentTrip}
                  onClick={() => handleOpenDetail(mostCurrentTrip._id, "")}
                />

                <div className="trip-detail-buttons">
                  <button
                    onClick={() =>
                      handleOpenDetail(mostCurrentTrip._id, "campsites")
                    }
                  >
                    Campsites
                  </button>
                  <button
                    onClick={() =>
                      handleOpenDetail(mostCurrentTrip._id, "meals")
                    }
                  >
                    Meals
                  </button>
                  <button
                    onClick={() =>
                      handleOpenDetail(mostCurrentTrip._id, "gear")
                    }
                  >
                    Gear
                  </button>
                  <button
                    onClick={() =>
                      handleOpenDetail(mostCurrentTrip._id, "crew")
                    }
                  >
                    Crew
                  </button>
                  <button
                    onClick={() =>
                      handleOpenDetail(mostCurrentTrip._id, "expenses")
                    }
                  >
                    Expenses
                  </button>
                </div>

                {selectedTripId === mostCurrentTrip._id && (
                  <TripDetailPanel
                    tripId={selectedTripId}
                    view={selectedDetailView || ""}
                    onClose={clearSelectedTrip}
                  />
                )}
              </div>
            </section>
          )}

          {futureTrips.length > 0 && (
            <section className="dashboard-section">
              <h2>Upcoming Trips</h2>
              {filteredFutureTrips.map((trip) => (
                <div key={trip._id} className="trip-card">
                  <TripSummaryCard
                    trip={trip}
                    onClick={() => handleOpenDetail(trip._id, "")}
                  />
                  <div className="trip-detail-buttons">
                    <button
                      onClick={() => handleOpenDetail(trip._id, "campsites")}
                    >
                      Campsites
                    </button>
                    <button onClick={() => handleOpenDetail(trip._id, "meals")}>
                      Meals
                    </button>
                    <button onClick={() => handleOpenDetail(trip._id, "gear")}>
                      Gear
                    </button>
                    <button onClick={() => handleOpenDetail(trip._id, "crew")}>
                      Crew
                    </button>
                    <button
                      onClick={() => handleOpenDetail(trip._id, "expenses")}
                    >
                      Expenses
                    </button>
                  </div>

                  {selectedTripId === trip._id && (
                    <TripDetailPanel
                      tripId={selectedTripId}
                      view={selectedDetailView || ""}
                      onClose={clearSelectedTrip}
                    />
                  )}
                </div>
              ))}
            </section>
          )}

          {pastTrips.length > 0 && (
            <section className="dashboard-section">
              <h2>Past Trips</h2>
              {filteredPastTrips.map((trip) => (
                <div key={trip._id} className="trip-card">
                  <TripSummaryCard
                    trip={trip}
                    onClick={() => handleOpenDetail(trip._id, "")}
                  />
                  <div className="trip-detail-buttons">
                    <button
                      onClick={() => handleOpenDetail(trip._id, "campsites")}
                    >
                      Campsites
                    </button>
                    <button onClick={() => handleOpenDetail(trip._id, "meals")}>
                      Meals
                    </button>
                    <button onClick={() => handleOpenDetail(trip._id, "gear")}>
                      Gear
                    </button>
                    <button onClick={() => handleOpenDetail(trip._id, "crew")}>
                      Crew
                    </button>
                    <button
                      onClick={() => handleOpenDetail(trip._id, "expenses")}
                    >
                      Expenses
                    </button>
                  </div>

                  {selectedTripId === trip._id && (
                    <TripDetailPanel
                      tripId={selectedTripId}
                      view={selectedDetailView || ""}
                      onClose={clearSelectedTrip}
                    />
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
