import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/Home";
import Signup from "./components/SignUp";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Pre-login Home page (with Login embedded) */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Home />} />

        {/* Signup page */}
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
