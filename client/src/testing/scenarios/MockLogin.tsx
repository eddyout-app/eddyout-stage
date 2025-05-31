// src/testing/scenarios/MockLogin.tsx

import { useNavigate } from "react-router-dom";

export default function MockLogin() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Fake auth token (if your app checks this)
    localStorage.setItem("authToken", "fake-token");

    // Fake current user (matches your mock user for MealSection)
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        _id: "user1",
        fullName: "Lisa J.",
        email: "lisa@example.com",
      })
    );

    // Redirect to MealSection test page
    navigate("/mealtest");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-light-neutral text-textBody">
      <h1 className="text-3xl mb-6 font-header text-primary">
        Mock Login (DEV ONLY)
      </h1>
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-lg transition"
      >
        Login as Lisa J.
      </button>
    </div>
  );
}
