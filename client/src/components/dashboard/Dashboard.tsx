import { useEffect, useState, useRef } from "react";
import { TripData } from "../../types/trip";
import TripSummaryCard from "../../components/tripDetails/TripSummaryCard";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import TripDetailPanel from "../../components/tripDetails/TripDetailPanel";
import { useQuery } from "@apollo/client";
import { GET_ALL_TRIPS } from "../../graphql";
import NewTripForm from "../../components/NewTrip";
import SidePanel from "../../components/SidePanel";
import UserProfile from "../../components/user/UserProfile";

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
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [showPast, setShowPast] = useState(false);

  const [navScrolled, setNavScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
  const [selectedTrip, setSelectedTrip] = useState<TripData | null>(null);

  const panelContainerRef = useRef<HTMLDivElement>(null);

  function handleOpenDetail(tripId: string) {
    if (selectedTripId === tripId) {
      // Clicking the same trip → close it
      setSelectedTripId(null);
      setSelectedDetailView(null);
      setSelectedTrip(null);
    } else {
      // Clicking new trip → open it
      const trip = trips.find((t) => t._id === tripId) || null;
      setSelectedTripId(tripId);
      setSelectedTrip(trip);
      setSelectedDetailView(""); // reset component view

      // Scroll the panel container into view after state update
      setTimeout(() => {
        panelContainerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }

  function handleChangeDetailView(viewName: string) {
    setSelectedDetailView(viewName);
  }

  function clearSelectedTrip() {
    setSelectedTripId(null);
    setSelectedDetailView(null);
    setSelectedTrip(null);
  }

  if (loading) {
    return (
      <>
        <Nav onProfileClick={() => setIsProfileOpen(true)} />
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          Loading trips...
        </p>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Nav onProfileClick={() => setIsProfileOpen(true)} />
        <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
          Error loading trips: {error.message}
        </p>
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
    <div className="app-layout">
      <Nav
        onProfileClick={() => setIsProfileOpen(true)}
        isScrolled={navScrolled}
      />
      <main>
        <div className="hero-banner">
          <div className="hero-overlay">
            <h1>Welcome to Eddy Out</h1>
            <p>Plan your next river trip — everything in one place.</p>
          </div>
        </div>

        <div className="dashboard-page">
          <div className="dashboard-content">
            {/* Dashboard Header */}
            <div className="dashboard-header">
              <h1>Trip Dashboard</h1>
              <button onClick={() => setIsNewTripOpen(true)}>+ New Trip</button>
            </div>

            {/* Conditional content */}
            {trips.length === 0 ? (
              <>
                <p className="no-trips-message">
                  You do not have any trips yet.
                </p>
                <p className="no-trips-sub">
                  Once you're added to a trip or create a new one, it will
                  appear here.
                </p>
              </>
            ) : (
              <>
                <p className="description">
                  Here is a list of all available trips. Click each one to see
                  more details or assign yourself to a task.
                </p>

                {/* Current Trip */}
                {mostCurrentTrip && (
                  <section className="dashboard-section">
                    <h2>Current Trip</h2>
                    <div className="trip-summary">
                      <TripSummaryCard
                        trip={mostCurrentTrip}
                        onClick={() => handleOpenDetail(mostCurrentTrip._id)}
                      />
                    </div>
                  </section>
                )}

                {/* Upcoming Trips */}
                <section className="dashboard-section">
                  <div className="dashboard-section-header">
                    <h2>Upcoming Trips</h2>
                    <button
                      className="btn-action"
                      onClick={() => setShowUpcoming(!showUpcoming)}
                    >
                      {showUpcoming ? "Hide" : "Show"}
                    </button>
                  </div>

                  {showUpcoming &&
                    filteredFutureTrips.map((trip) => (
                      <div key={trip._id} className="trip-summary">
                        <TripSummaryCard
                          trip={trip}
                          onClick={() => handleOpenDetail(trip._id)}
                        />
                      </div>
                    ))}
                </section>

                {/* Past Trips */}
                <section className="dashboard-section">
                  <div className="dashboard-section-header">
                    <h2>Past Trips</h2>
                    <button
                      className="btn-action"
                      onClick={() => setShowPast(!showPast)}
                    >
                      {showPast ? "Hide" : "Show"}
                    </button>
                  </div>

                  {showPast &&
                    filteredPastTrips.map((trip) => (
                      <div key={trip._id} className="trip-summary">
                        <TripSummaryCard
                          trip={trip}
                          onClick={() => handleOpenDetail(trip._id)}
                        />
                      </div>
                    ))}
                </section>

                {/* Trip Detail Panel (moved OUTSIDE trip list!) */}
                {selectedTrip && (
                  <div
                    ref={panelContainerRef}
                    className="dashboard-detail-panel"
                  >
                    <TripDetailPanel
                      trip={selectedTrip}
                      user={user}
                      view={selectedDetailView || ""}
                      onClose={clearSelectedTrip}
                      onViewChange={handleChangeDetailView}
                    />
                  </div>
                )}
              </>
            )}
          </div>
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

        {/* User Profile SidePanel */}
        <SidePanel
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        >
          {isProfileOpen && <UserProfile user={user} />}
        </SidePanel>
      </main>

      <Footer />
    </div>
  );
}
