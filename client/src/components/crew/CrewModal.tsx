import { useState } from "react";
import { CrewMember } from "../../types/crew";

interface CrewModalProps {
  crewMember: CrewMember;
  userId: string;
  onClose: () => void;
  onSave: (updatedMember: CrewMember) => void;
}

export default function CrewModal({
  crewMember,
  userId,
  onClose,
  onSave,
}: CrewModalProps) {
  const [roleName, setRoleName] = useState(crewMember.role?.name || "");

  const handleSave = () => {
    const updatedMember: CrewMember = {
      ...crewMember,
      userId,
      role: {
        ...crewMember.role!,
        name: roleName,
      },
    };

    onSave(updatedMember);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-header mb-4">Edit Crew Member</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Role</label>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
