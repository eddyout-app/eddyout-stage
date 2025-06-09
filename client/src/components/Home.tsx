import { useState } from "react";
import Footer from "../components/Footer";
import Login from "../components/Login";
import ForgotPasswordForm from "../components/user/ForgotPasswordForm";
import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const [showForgotModal, setShowForgotModal] = useState(false);

  return (
    <div className="home-page">
      {/* Background */}
      <div className="home-background"></div>

      {/* Content */}
      <div className="home-content">
        {/* Welcome Section */}
        <div className="home-welcome">
          <h1>Welcome to Eddy Out — your river camp planner!</h1>
          <p>Plan your float, share your route, and hit the river!</p>
        </div>

        {/* Sidebar */}
        <div className="home-sidebar">
          <Login />
          <p className="signup-text">
            New user?{" "}
            <Link to="/signup" className="signup-link">
              Sign up!
            </Link>
          </p>
          <p className="forgot-password-text">
            <span
              role="button"
              onClick={() => setShowForgotModal(true)}
              className="signup-link"
              style={{ cursor: "pointer" }}
            >
              Forgot Password?
            </span>
          </p>
          <div className="home-logo">
            <img
              src="/Logo_bluenobg_EddyOut.png"
              alt="Eddy Out Logo"
              className="logo-image"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Modal */}
      {showForgotModal && (
        <ForgotPasswordForm onClose={() => setShowForgotModal(false)} />
      )}
    </div>
  );
}
