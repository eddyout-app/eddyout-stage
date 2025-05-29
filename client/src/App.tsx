import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard"; // Placeholder: dashboard of trips
import TripDetails from "./pages/TripDetails"; // Placeholder for trip overview
import FloatPlan from "./pages/FloatPlan";
import GearList from "./pages/GearList";
import Meals from "./pages/Meals";
import Crew from "./pages/Crew";
import SignUp from "./pages/SignUp"; // Placeholder for signup page
import NewTrip from "./pages/NewTrip";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Pre-login home page */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignUp />} />

        {/* Dashboard (list of user's trips after login) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Trip details page (overview with links to sub-pages) */}
        <Route path="/trips/:tripId" element={<TripDetails />}>
          <Route path="floatplan" element={<FloatPlan />} />
          <Route path="gear" element={<GearList />} />
          <Route path="meals" element={<Meals />} />
          <Route path="crew" element={<Crew />} />
        </Route>

        {/* New trip creation page */}
        <Route path="/newtrip" element={<NewTrip />} />
      </Routes>
    </Router>
  );
}
