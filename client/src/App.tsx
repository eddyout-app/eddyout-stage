// src/App.tsx
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import MealSectionWrapper from "./components/meals/MealSectionWrapper";
import TripDetailsWrapper from "./components/tripDetails/TripDetailsWrapper";

// Auth components (adjust as needed)
import Login from "./components/Login"; // REST-based login

// DEV ONLY Routes
import MockLogin from "./testing/scenarios/MockLogin";
import MockMealTest from "./testing/scenarios/MockMealTest";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* DEV ONLY */}
        <Route path="/mocklogin" element={<MockLogin />} />
        <Route path="/mealtest" element={<MockMealTest />} />

        {/* Pre-login routes */}
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        {/* Dashboard (list of user's trips after login) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Trip details page (overview with links to sub-pages) */}
        <Route path="/trips/:tripId" element={<TripDetailsWrapper />}>
          {/* Sub-pages: start with Meals only */}
          <Route path="meals" element={<MealSectionWrapper />} />
        </Route>
      </Routes>
    </Router>
  );
}
