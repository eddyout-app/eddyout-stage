import React, { useState } from "react";
import { TripFormData } from "../types/trip";
import { useMutation } from "@apollo/client";
import { CREATE_TRIP } from "../graphql/mutations/tripMutations";

interface NewTripFormProps {
  onClose: () => void;
  refetchTrips: () => void;
}

const NewTripForm = ({ onClose, refetchTrips }: NewTripFormProps) => {
  const [tripData, setTripData] = useState<TripFormData>({
    riverName: "",
    startDate: "",
    endDate: "",
    putIn: "",
    takeOut: "",
    crewNum: undefined,
  });

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
      refetchTrips();

      // Reset form
      setTripData({
        riverName: "",
        startDate: "",
        endDate: "",
        putIn: "",
        takeOut: "",
        crewNum: undefined,
      });

      // Instead of navigating → close the side panel!
      onClose();
    } catch (err) {
      console.error("Error creating trip:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="trip-form p-4">
      <h2 className="text-xl font-bold mb-4">Create a New Trip</h2>

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

      <div className="flex justify-between mt-6">
        <button type="button" className="btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn-dark" disabled={loading}>
          {loading ? "Submitting..." : "Submit Trip"}
        </button>
      </div>

      {error && <div className="text-red-500 mt-2">Error: {error.message}</div>}
    </form>
  );
};

export default NewTripForm;
