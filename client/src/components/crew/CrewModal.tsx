import { useMutation } from "@apollo/client";
import { CrewMember } from "../../types/crew";
import {
  ADD_CREW_MEMBER,
  UPDATE_CREW_MEMBER,
} from "../../graphql/mutations/crewMutations";
import { GET_CREW_BY_TRIP } from "../../graphql/queries/crewQueries";
import { handleSave } from "../../utils/handleSave"; // adjust path if needed
import { useState } from "react";

interface CrewModalProps {
  crewMember: CrewMember;
  userId: string;
  isLeader: boolean;
  onClose: () => void;
  onSave: (updatedMember: CrewMember) => void;
}

const ROLE_OPTIONS = [
  "Trip Leader",
  "Safety Officer",
  "Chef",
  "Gear Manager",
  "Navigator",
  "First Aid",
  "Crew Member",
];

export default function CrewModal({
  crewMember,
  userId,
  isLeader,
  onClose,
  onSave,
}: CrewModalProps) {
  const [role, setRole] = useState(crewMember.role || "");

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
        userId: userId, // for add
        role: role,
      }),
      updateVariables: (item) => ({
        crewId: item._id, // for update
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
    return null; // Only leader can edit
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-header mb-4">
          {isUnclaimed(crewMember) ? "Add Crew Member" : "Edit Crew Member"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="mb-4">
            <label className="block mb-1 font-medium">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {ROLE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
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
