import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  // const currentPage = useLocation().pathname;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("trip");
    localStorage.removeItem("tripId");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 md:h-16 px-4 md:px-6 text-sm md:text-base bg-white shadow-md z-50 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/dashboard" className="hover:opacity-80 transition-opacity">
          <img
            src="/Favicon_EddyOut.png"
            alt="Logo"
            className="h-10 w-auto hover:opacity-80 transition-opacity"
          />
        </Link>
      </div>

      {/* Right Section: New Trip + Logout */}
      <div className="flex items-center space-x-4">
        <Link to="/NewTrip" className="btn-dark">
          New Trip
        </Link>

        <button
          onClick={handleLogout}
          className="text-gray-500 hover:text-blue-600 focus:outline-none text-sm"
        >
          Logout
        </button>
      </div>
      {/* <Link to="/UserProfile">
          <img
            src="/path-to-avatar.jpg" // Replace with the actual avatar URL
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-blue-600 hover:opacity-80 transition-opacity"
          />
        </Link> */}
      {/* <Link
            to="/MyTrips"
            className={`${
              currentPage === "/MyTrips"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600"
            } pb-1 transition-colors duration-200`}
          >
            My Trips
          </Link> */}
    </nav>
  );
};

export default Nav;
