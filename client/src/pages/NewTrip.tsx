import React, { useState } from "react";
import { TripFormData } from "../interfaces/TripData";
import { createTrip } from "../api/tripAPI";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const NewTrip = () => {
  const [tripData, setTripData] = useState<TripFormData>({
    riverName: "",
    startDate: "",
    endDate: "",
    putIn: "",
    takeOut: "",
    crewNum: "",
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTripData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in local storage");
      return;
    }

    const tripWithId: TripFormData = {
      ...tripData,
      organizerId: userId,
    };

    console.log("Submitted trip:", tripWithId);

    try {
      const result = await createTrip(tripWithId);

      console.log("Trip created successfully:", result);
      setTripData({
        riverName: "",
        startDate: "",
        endDate: "",
        putIn: "",
        takeOut: "",
        crewNum: "",
        email: "",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating trip:", error);
    }
  };

  return (
    <>
      <Nav />
      <main>
        <form onSubmit={handleSubmit} className="trip-form">
          <h2>Create a New Trip</h2>

          <label className="form-label">
            River:
            <input
              type="text"
              name="riverName"
              value={tripData.riverName}
              onChange={handleChange}
              className="form-input"
            />
          </label>

          <label className="form-label">
            Start Date:
            <input
              type="date"
              name="startDate"
              value={tripData.startDate}
              onChange={handleChange}
              className="form-input"
            />
          </label>

          <label className="form-label">
            End Date:
            <input
              type="date"
              name="endDate"
              value={tripData.endDate}
              onChange={handleChange}
              className="form-input"
            />
          </label>

          <label className="form-label">
            Put In:
            <input
              type="text"
              name="putIn"
              value={tripData.putIn}
              onChange={handleChange}
              className="form-input"
            />
          </label>

          <label className="form-label">
            Take Out:
            <input
              type="text"
              name="takeOut"
              value={tripData.takeOut}
              onChange={handleChange}
              className="form-input"
            />
          </label>

          <label className="form-label">
            Crew Size:
            <input
              type="number"
              name="crewNum"
              value={tripData.crewNum}
              onChange={handleChange}
              className="form-input"
            />
          </label>

          <button type="submit" className="btn-dark">
            Submit Trip
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default NewTrip;
