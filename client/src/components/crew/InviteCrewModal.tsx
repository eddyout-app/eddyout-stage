import { useState } from "react";
import { TripData } from "../../types/trip";

interface InviteCrewModalProps {
  trip: TripData;
  onClose: () => void;
}

export default function InviteCrewModal({
  trip,
  onClose,
}: InviteCrewModalProps) {
  const [email, setEmail] = useState("");

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Inviting ${email} to trip ${trip._id}`);
    // Future: call mutation to send invite!
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-header mb-4 text-center">
          Invite Crew Member
        </h2>
        <form onSubmit={handleSendInvite}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Send Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
