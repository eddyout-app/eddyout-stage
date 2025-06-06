import { useState } from "react";
import { CampsiteData } from "../../types/campsites";
import { useMutation } from "@apollo/client";
import {
  ADD_CAMPSITE,
  UPDATE_CAMPSITE,
} from "../../graphql/mutations/campsitesMutations";
import { GET_CAMPSITES } from "../../graphql/queries/campsitesQueries";

interface CampsiteModalProps {
  campsite: CampsiteData;
  isLeader: boolean;
  onClose: () => void;
  onSave: (updatedCampsite: CampsiteData) => void;
}

export default function CampsiteModal({
  campsite,
  isLeader,
  onClose,
  onSave,
}: CampsiteModalProps) {
  const [locationName, setLocationName] = useState(campsite.name || "");

  const [updateCampsite] = useMutation(UPDATE_CAMPSITE);
  const [addCampsite] = useMutation(ADD_CAMPSITE);

  const handleSave = async () => {
    try {
      let updatedCampsite: CampsiteData;

      if (campsite._id.startsWith("unassigned")) {
        const result = await addCampsite({
          variables: {
            tripId: campsite.tripId,
            name: locationName,
            description: "",
            location: {
              latitude: 0,
              longitude: 0,
            },
            startDate: campsite.startDate,
            endDate: campsite.startDate,
            weather: {
              temperature: null,
              conditions: null,
              windSpeed: null,
              humidity: null,
              precipitation: null,
            },
          },
          refetchQueries: [
            {
              query: GET_CAMPSITES,
              variables: { tripId: campsite.tripId },
            },
          ],
        });

        console.log("AddCampsite result:", result.data);

        updatedCampsite = result.data.addCampsite;
      } else {
        const result = await updateCampsite({
          variables: {
            campsiteId: campsite._id,
            name: locationName,
          },
          refetchQueries: [
            {
              query: GET_CAMPSITES,
              variables: { tripId: campsite.tripId },
            },
          ],
        });

        console.log("UpdateCampsite result:", result.data);

        updatedCampsite = result.data.updateCampsite;
      }

      onSave(updatedCampsite);
      onClose();
    } catch (err) {
      console.error("Error saving campsite:", err);
    }
  };

  // Simple permissions logic: leader can always edit
  if (!isLeader) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-header mb-4">
          {campsite.name ? "Edit Campsite" : "Assign Campsite"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // prevent page reload
            handleSave();
          }}
        >
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Campsite Location Name
            </label>
            <input
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" onClick={handleSave} className="btn-primary">
              {campsite.name ? "Save Changes" : "Assign Campsite"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
