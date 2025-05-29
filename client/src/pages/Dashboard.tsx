import { useEffect, useState } from "react";
import { TripData } from "../interfaces/TripData";
import TripSummaryCard from "../components/TripSummaryCard";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { getTrips } from "../api/tripAPI";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [trips, setTrips] = useState<TripData[]>([]);

  useEffect(() => {
    async function fetchTrips() {
      const data = await getTrips();
      // Convert date strings into actual Date objects
      const parsed = data.map((trip: TripData) => ({
        ...trip,
        startDate: new Date(trip.startDate),
        endDate: new Date(trip.endDate),
      }));
      setTrips(parsed);
    }
    fetchTrips();
  }, []);

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

  // Separate trips into future, past, and current
  const futureTrips = trips.filter((trip) => trip.startDate > now);
  const pastTrips = trips.filter((trip) => trip.endDate < now);
  const currentTrips = trips.filter(
    (trip) => trip.startDate <= now && trip.endDate >= now
  );

  // Pick the most current trip
  const mostCurrentTrip = [...currentTrips, ...futureTrips].sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  )[0];

  const filteredFutureTrips = futureTrips.filter(
    (t) => t.id !== mostCurrentTrip?.id
  );
  const filteredPastTrips = pastTrips.filter(
    (t) => t.id !== mostCurrentTrip?.id
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
              <Link
                key={mostCurrentTrip.id}
                to={`/trips/${mostCurrentTrip.id}`}
              >
                <TripSummaryCard trip={mostCurrentTrip} />
              </Link>
            </section>
          )}

          {futureTrips.length > 0 && (
            <section className="dashboard-section">
              <h2>Upcoming Trips</h2>
              {filteredFutureTrips.map((trip) => (
                <Link key={trip.id} to={`/trips/${trip.id}`}>
                  <TripSummaryCard trip={trip} />
                </Link>
              ))}
            </section>
          )}

          {pastTrips.length > 0 && (
            <section className="dashboard-section">
              <h2>Past Trips</h2>
              {filteredPastTrips.map((trip) => (
                <Link key={trip.id} to={`/trips/${trip.id}`}>
                  <TripSummaryCard trip={trip} />
                </Link>
              ))}
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
