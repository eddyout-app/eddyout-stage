import { useState } from "react";
import { TripData } from "../../types/trip";

import "../../styles/modal.css"; // ✅ GLOBAL modal styles

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
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Invite Crew Member</h2>

        <form onSubmit={handleSendInvite}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="modal-buttons">
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
