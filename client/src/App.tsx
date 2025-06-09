import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/Home";
import Signup from "./components/SignUp";
import ResetPasswordForm from "./components/user/ResetPasswordForm";

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

        {/* Password reset routes */}
        <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
      </Routes>
    </Router>
  );
}
