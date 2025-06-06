import { useState } from "react";
import { TripData } from "../../types/trip";
import TripSummaryCard from "../../components/tripDetails/TripSummaryCard";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import TripDetailPanel from "../../components/tripDetails/TripDetailPanel";
import { useQuery } from "@apollo/client";
import { GET_ALL_TRIPS } from "../../graphql";
import NewTripForm from "../../components/NewTrip";
import SidePanel from "../../components/SidePanel";

export default function Dashboard() {
  const userId = localStorage.getItem("userId") || "";
  const user = {
    _id: userId,
    email: localStorage.getItem("email") || "",
    firstname: localStorage.getItem("firstname") || "",
    lastname: localStorage.getItem("lastname") || "",
    createdAt: "",
    updatedAt: "",
  };
  const [isNewTripOpen, setIsNewTripOpen] = useState(false);

  const { data, loading, error, refetch } = useQuery<{ trips: TripData[] }>(
    GET_ALL_TRIPS,
    {
      variables: { userId },
      skip: !userId,
    }
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
          {/* Dashboard Header with "New Trip" button */}
          <div className="flex items-center justify-between mb-6 px-4 mt-10">
            <h1 className="text-2xl font-bold">Trip Dashboard</h1>
            <button className="btn-dark" onClick={() => setIsNewTripOpen(true)}>
              + New Trip
            </button>
          </div>

          {/* Conditional content */}
          {trips.length === 0 ? (
            <>
              <div className="text-center mt-20 text-primary font-header text-xl">
                You do not have any trips yet.
              </div>
              <div className="text-center mt-4 text-textBody font-body text-lg">
                Once you're added to a trip or create a new one, it will appear
                here.
              </div>
            </>
          ) : (
            <>
              <p className="description">
                Here is a list of all available trips. Click each one to see
                more details or assign yourself to a task.
              </p>

              {/* Most Current Trip */}
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
                        trip={mostCurrentTrip}
                        user={user}
                        view={selectedDetailView || ""}
                        onClose={clearSelectedTrip}
                      />
                    )}
                  </div>
                </section>
              )}

              {/* Upcoming Trips */}
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
                          onClick={() =>
                            handleOpenDetail(trip._id, "campsites")
                          }
                        >
                          Campsites
                        </button>
                        <button
                          onClick={() => handleOpenDetail(trip._id, "meals")}
                        >
                          Meals
                        </button>
                        <button
                          onClick={() => handleOpenDetail(trip._id, "gear")}
                        >
                          Gear
                        </button>
                        <button
                          onClick={() => handleOpenDetail(trip._id, "crew")}
                        >
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
                          trip={trip}
                          user={user}
                          view={selectedDetailView || ""}
                          onClose={clearSelectedTrip}
                        />
                      )}
                    </div>
                  ))}
                </section>
              )}

              {/* Past Trips */}
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
                          onClick={() =>
                            handleOpenDetail(trip._id, "campsites")
                          }
                        >
                          Campsites
                        </button>
                        <button
                          onClick={() => handleOpenDetail(trip._id, "meals")}
                        >
                          Meals
                        </button>
                        <button
                          onClick={() => handleOpenDetail(trip._id, "gear")}
                        >
                          Gear
                        </button>
                        <button
                          onClick={() => handleOpenDetail(trip._id, "crew")}
                        >
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
                          trip={trip}
                          user={user}
                          view={selectedDetailView || ""}
                          onClose={clearSelectedTrip}
                        />
                      )}
                    </div>
                  ))}
                </section>
              )}
            </>
          )}
        </div>

        {/* New Trip SidePanel */}
        <SidePanel
          isOpen={isNewTripOpen}
          onClose={() => setIsNewTripOpen(false)}
        >
          <NewTripForm
            onClose={() => setIsNewTripOpen(false)}
            refetchTrips={refetch}
          />
        </SidePanel>
      </main>

      <Footer />
    </div>
  );
}
