import { Link, useLocation, useNavigate } from "react-router-dom";

const Nav = () => {
  const currentPage = useLocation().pathname;
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens or state here
    // e.g., localStorage.removeItem("authToken");
    // Optionally, clear any global state or call your auth provider's logout function

    // Redirect to the pre-auth home page, change "/" to your landing page if needed
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-800"
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 w-auto hover:opacity-80 transition-opacity"
          />
        </Link>
      </div>

      {/* Navigation Buttons */}
      <ul className="flex space-x-6 text-lg font-medium">
        <li>
          <Link
            to="/MyTrips"
            className={`${
              currentPage === "/MyTrips"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600"
            } pb-1 transition-colors duration-200`}
          >
            My Trips
          </Link>
        </li>
        <li>
          <Link
            to="/NewTrip"
            className={`${
              currentPage === "/NewTrip"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600"
            } pb-1 transition-colors duration-200`}
          >
            New Trip
          </Link>
        </li>
      </ul>

      {/* Right Section: Logout Button and User Profile */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLogout}
          className="text-gray-700 hover:text-blue-600 focus:outline-none"
        >
          Logout
        </button>
        <Link to="/UserProfile">
          <img
            src="/path-to-avatar.jpg" // Replace with the actual avatar URL
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-blue-600 hover:opacity-80 transition-opacity"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
