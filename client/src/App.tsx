import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

<<<<<<< HEAD
// import Home from "./pages/Home";
// import Dashboard from "./features/dashboard/Dashboard"; // Placeholder: dashboard of trips
// import TripDetails from "./features/tripDetails/TripDetails"; // Placeholder for trip overview
// import FloatPlan from "./pages/FloatPlan";
// import GearList from "./components/gear/GearList";
// import Meals from "./components/meals/MealSection";
// import Crew from "./pages/Crew";
// import SignUp from "./pages/SignUp";
// import NewTrip from "./pages/NewTrip";
import MockLogin from "./testing/scenarios/MockLogin";
import MockMealTest from "./testing/scenarios/MockMealTest";
=======
import Home from "./pages/Home";
import Dashboard from "./features/dashboard/Dashboard"; // Placeholder: dashboard of trips
import TripDetails from "./features/tripDetails/TripDetails"; // Placeholder for trip overview
// import FloatPlan from "./pages/FloatPlan";
import GearList from "./features/gear/GearList";
import Meals from "./features/meals/Meals";
// import Crew from "./pages/Crew";
import SignUp from "./pages/SignUp"; // Placeholder for signup page
import NewTrip from "./pages/NewTrip";
>>>>>>> 7319539eb76b03c92969313fff40cbfc7522696e

export default function App() {
  return (
    <Router>
      <Routes>
        {/* DEV ONLY Routes*/}
        <Route path="/mocklogin" element={<MockLogin />} />
        <Route path="/mealtest" element={<MockMealTest />} />
        {/* Pre-login home page */}
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignUp />} /> */}
        {/* Dashboard (list of user's trips after login) */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* Trip details page (overview with links to sub-pages) */}
<<<<<<< HEAD
        {/* <Route path="/trips/:tripId" element={<TripDetails />}>
          <Route path="floatplan" element={<FloatPlan />} />
          <Route path="gear" element={<GearList />} />
          <Route path="meals" element={<Meals />} />
          <Route path="crew" element={<Crew />} />
        </Route> */}
=======
        <Route path="/trips/:tripId" element={<TripDetails />}>
          {/* <Route path="floatplan" element={<FloatPlan />} /> */}
          <Route path="gear" element={<GearList />} />
          <Route path="meals" element={<Meals />} />
          {/* <Route path="crew" element={<Crew />} /> */}
        </Route>

>>>>>>> 7319539eb76b03c92969313fff40cbfc7522696e
        {/* New trip creation page */}
        {/* <Route path="/newtrip" element={<NewTrip />} /> */}
      </Routes>
    </Router>
  );
}
