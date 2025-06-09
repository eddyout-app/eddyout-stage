import { useMutation } from "@apollo/client";
import { CrewMember } from "../../types/crew";
import {
  ADD_CREW_MEMBER,
  UPDATE_CREW_MEMBER,
} from "../../graphql/mutations/crewMutations";
import { GET_CREW_BY_TRIP } from "../../graphql/queries/crewQueries";
import { handleSave } from "../../utils/handleSave";
import { useState } from "react";
import { CrewRole, CREW_ROLE_OPTIONS } from "../../types/roles";

import "../../styles/modal.css"; // ✅ GLOBAL modal styles

interface CrewModalProps {
  crewMember: CrewMember;
  userId: string;
  isLeader: boolean;
  onClose: () => void;
  onSave: (updatedMember: CrewMember) => void;
}

export default function CrewModal({
  crewMember,
  userId,
  isLeader,
  onClose,
  onSave,
}: CrewModalProps) {
  const [role, setRole] = useState<CrewRole>(crewMember.role as CrewRole);

  const [addCrewMember] = useMutation(ADD_CREW_MEMBER);
  const [updateCrewMember] = useMutation(UPDATE_CREW_MEMBER);

  const isUnclaimed = (item: CrewMember) => item._id.startsWith("unassigned");

  const handleSubmit = async () => {
    await handleSave<CrewMember>({
      item: crewMember,
      isUnclaimed,
      addMutation: addCrewMember,
      updateMutation: updateCrewMember,
      addVariables: (item) => ({
        tripId: item.tripId,
        userId: userId,
        role: role,
      }),
      updateVariables: (item) => ({
        crewId: item._id,
        role: role,
      }),
      refetchQueries: [
        {
          query: GET_CREW_BY_TRIP,
          variables: { tripId: crewMember.tripId },
        },
      ],
      onSave,
      onClose,
    });
  };

  if (!isLeader) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>
          {isUnclaimed(crewMember) ? "Add Crew Member" : "Edit Crew Member"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="form-group">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as CrewRole)}
              className="form-input"
            >
              {CREW_ROLE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {isUnclaimed(crewMember) ? "Add Member" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
