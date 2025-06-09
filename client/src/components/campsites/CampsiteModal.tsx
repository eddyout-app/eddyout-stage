import { useState } from "react";
import { CampsiteData } from "../../types/campsites";
import { useMutation } from "@apollo/client";
import {
  ADD_CAMPSITE,
  UPDATE_CAMPSITE,
} from "../../graphql/mutations/campsitesMutations";
import { GET_CAMPSITES } from "../../graphql/queries/campsitesQueries";

import "../../styles/modal.css"; // ✅ GLOBAL modal styles

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

        updatedCampsite = result.data.updateCampsite;
      }

      onSave(updatedCampsite);
      onClose();
    } catch (err) {
      console.error("Error saving campsite:", err);
    }
  };

  if (!isLeader) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{campsite.name ? "Edit Campsite" : "Assign Campsite"}</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="form-group">
            <label htmlFor="locationName" className="form-label">
              Campsite Location Name
            </label>
            <input
              id="locationName"
              type="text"
              className="form-input"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
            />
          </div>

          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {campsite.name ? "Save Changes" : "Assign Campsite"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
