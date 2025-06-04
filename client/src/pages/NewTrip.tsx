import React, { useState } from "react";
import { TripFormData } from "../types/trip";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useMutation } from "@apollo/client";
import { CREATE_TRIP } from "../graphql/mutations/tripMutations";

const NewTrip = () => {
  const [tripData, setTripData] = useState<TripFormData>({
    riverName: "",
    startDate: "",
    endDate: "",
    putIn: "",
    takeOut: "",
    crewNum: undefined,
  });

  const navigate = useNavigate();

  const [createTrip, { loading, error }] = useMutation(CREATE_TRIP);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTripData((prevData) => ({
      ...prevData,
      [name]: name === "crewNum" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in local storage");
      return;
    }

    try {
      console.log("Submitting trip:", {
        ...tripData,
        crewNum: tripData.crewNum ?? 1,
        organizerId: userId,
      });

      const result = await createTrip({
        variables: {
          riverName: tripData.riverName,
          startDate: tripData.startDate,
          endDate: tripData.endDate,
          putIn: tripData.putIn,
          takeOut: tripData.takeOut,
          crewNum: tripData.crewNum ?? 1,
          organizerId: userId,
        },
      });

      console.log("Trip created successfully:", result);

      // Reset form
      setTripData({
        riverName: "",
        startDate: "",
        endDate: "",
        putIn: "",
        takeOut: "",
        crewNum: undefined,
      });

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Error creating trip:", err);
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
            Crew Size (optional):
            <input
              type="number"
              name="crewNum"
              value={tripData.crewNum ?? ""}
              onChange={handleChange}
              className="form-input"
              min={1}
            />
          </label>

          <button type="submit" className="btn-dark" disabled={loading}>
            {loading ? "Submitting..." : "Submit Trip"}
          </button>

          {error && (
            <div className="text-red-500 mt-2">Error: {error.message}</div>
          )}
        </form>
      </main>
      <Footer />
    </>
  );
};

export default NewTrip;
