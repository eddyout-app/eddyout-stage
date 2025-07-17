import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/Home";
import Signup from "./components/SignUp";
import ResetPasswordForm from "./components/user/ResetPasswordForm";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password/:token" element={<ResetPasswordForm />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
