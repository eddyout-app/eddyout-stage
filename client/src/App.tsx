// src/App.tsx
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";

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
      </Routes>
    </Router>
  );
}
