import Footer from "../components/Footer";
import Login from "../components/Login";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-screen overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="h-full w-full bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage: "url('/river.jpg')",
          }}
        ></div>
      </div>

      {/* Content & Sidebar */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-6xl gap-10">
          {/* Welcome Section */}
          <div className="flex-1 flex justify-center">
            <div className="bg-white/20 p-6 rounded-lg shadow-lg backdrop-blur-sm max-w-3xl w-full">
              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                Welcome to Eddy Out your river camp planner!
              </h1>
              <p className="text-lg text-gray-800">
                Plan your float, share your route, and hit the river!
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full max-w-sm bg-white bg-opacity-90 shadow-xl rounded-lg p-6 flex flex-col justify-center">
            <Login />
            <p className="mt-4 text-sm">
              New user?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up!
              </Link>
            </p>
            <div className="flex justify-center mt-10 px-4">
              <img
                src="/Logo_EddyOut.png"
                alt="Eddy Out Logo"
                className="h-24 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
