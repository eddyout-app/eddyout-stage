import { Link, useNavigate } from "react-router-dom";

interface NavProps {
  onProfileClick: () => void;
  isScrolled?: boolean;
}

const Nav = ({ onProfileClick, isScrolled }: NavProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      {/* Logo */}
      <div className="logo">
        <Link to="/dashboard" className="hover:opacity-80 transition-opacity">
          <img
            src="/Logo_whitenobg_EddyOut.png"
            alt="Logo"
            className="h-10 w-auto hover:opacity-80 transition-opacity"
          />
        </Link>
      </div>

      {/* Right Section: Avatar + Logout */}
      <div className="nav-right">
        {/* Avatar button */}
        <button onClick={onProfileClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>

          {/* <img
            src="/path-to-avatar.jpg" // replace later with real avatar
            alt="User Avatar"
            className="avatar"
          /> */}
        </button>

        {/* Logout button */}
        <button onClick={handleLogout} className="logout">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Nav;
