import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import TripSummaryCard from "../components/TripSummaryCard";
import { getTrips } from "../api/tripAPI";
import { TripData } from "../interfaces/TripData"; // Make sure this import is correct.
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function TripDetails() {
  const { tripId } = useParams<{ tripId: string }>();
  const [trip, setTrip] = useState<TripData | null>(null);

  console.log("🚨 tripId from useParams:", tripId);
  useEffect(() => {
    async function fetchTrip() {
      try {
        const allTrips = await getTrips();
        const parsedTrips: TripData[] = allTrips.map((trip: TripData) => ({
          ...trip,
          startDate: new Date(trip.startDate),
          endDate: new Date(trip.endDate),
        }));
        console.log("ID from URL:", tripId);

        const foundTrip = parsedTrips.find((t) => {
          console.log(`Comparing ${t.id} === ${tripId}`);
          return t.id === tripId;
        });

        if (foundTrip) {
          console.log("Matched Trip:", foundTrip);
          setTrip(foundTrip);
        } else {
          console.error("Trip not found");
        }
      } catch (error) {
        console.error("Error fetching trip:", error);
      }
    }

    if (tripId) {
      fetchTrip();
    }
  }, [tripId]);

  if (!trip) {
    return (
      <div className="text-center mt-10 text-textBody font-body text-lg">
        Loading trip details...
      </div>
    );
  }

  return (
    <div className="h-screen w-screen">
      <Nav />
      <main>
        <div className="tripdetails-page">
          <TripSummaryCard trip={trip} />

          {/* NAVBAR-STYLE TABS */}
          <div className="flex justify-center gap-4 mb-6 border-b border-gray-300">
            <NavLink
              to={`/trips/${tripId}/floatplan`}
              className={({ isActive }) =>
                isActive
                  ? "trip-tab-link trip-tab-link-active"
                  : "trip-tab-link"
              }
            >
              Float Plan
            </NavLink>
            <NavLink
              to={`/trips/${tripId}/meals`}
              className={({ isActive }) =>
                isActive
                  ? "trip-tab-link trip-tab-link-active"
                  : "trip-tab-link"
              }
            >
              Meals
            </NavLink>
            <NavLink
              to={`/trips/${tripId}/gear`}
              className={({ isActive }) =>
                isActive
                  ? "trip-tab-link trip-tab-link-active"
                  : "trip-tab-link"
              }
            >
              OarGanizer
            </NavLink>
            <NavLink
              to={`/trips/${tripId}/crew`}
              className={({ isActive }) =>
                isActive
                  ? "trip-tab-link trip-tab-link-active"
                  : "trip-tab-link"
              }
            >
              Crew
            </NavLink>
          </div>

          {/* OUTLET FOR NESTED COMPONENTS */}
          <div className="mt-4">
            <Outlet context={{ trip }} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
