import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS } from "../../graphql/queries/userQueries";
import { GET_CREW_BY_TRIP } from "../../graphql/queries/crewQueries";
import { ADD_CREW_MEMBER } from "../../graphql/mutations/crewMutations";
import { TripData } from "../../types/trip";
import { UserData } from "../../types/user";
import { CrewRole, CREW_ROLE_OPTIONS } from "../../types/roles";
import { useState } from "react";
import { CrewMember } from "../../types/crew";

import "../../styles/modal.css"; // ✅ GLOBAL modal styles

interface AddCrewModalProps {
  trip: TripData;
  onClose: () => void;
}

export default function AddCrewModal({ trip, onClose }: AddCrewModalProps) {
  const { data, loading, error } = useQuery(GET_USERS);
  const { data: crewData } = useQuery(GET_CREW_BY_TRIP, {
    variables: { tripId: trip._id },
    skip: !trip._id,
  });

  const [addCrewMember] = useMutation(ADD_CREW_MEMBER);

  const [search, setSearch] = useState("");
  const [addingUserId, setAddingUserId] = useState<string | null>(null);
  const [roleInputs, setRoleInputs] = useState<{ [userId: string]: CrewRole }>(
    {}
  );
  const [addedUserIds, setAddedUserIds] = useState<Set<string>>(new Set());

  const allUsers: UserData[] = data?.users || [];

  const existingCrewUserIds = new Set(
    (crewData?.crewByTrip || []).map((member: CrewMember) =>
      typeof member.userId === "string" ? member.userId : member.userId._id
    )
  );

  const filteredUsers = allUsers.filter((user) => {
    const term = search.toLowerCase();
    return (
      `${user.firstName || ""} ${user.lastName || ""}`
        .trim()
        .toLowerCase()
        .includes(term) || user.email.toLowerCase().includes(term)
    );
  });

  const handleAddCrew = async (userId: string) => {
    const role = roleInputs[userId] || "Crew";
    try {
      setAddingUserId(userId);
      await addCrewMember({
        variables: {
          tripId: trip._id,
          userId,
          role,
        },
      });
      console.log(`User ${userId} added to crew with role ${role}!`);

      setAddedUserIds((prev) => new Set(prev).add(userId));
    } catch (err) {
      console.error("Error adding crew member:", err);
    } finally {
      setAddingUserId(null);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Crew Member</h2>

        <div className="form-group">
          <label htmlFor="search" className="form-label">
            Search
          </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
            className="form-input"
          />
        </div>

        {loading && <div className="text-center">Loading users...</div>}
        {error && (
          <div className="text-center text-red-600 mb-4">
            Error loading users: {error.message}
          </div>
        )}

        <div
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            marginBottom: "1.5rem",
          }}
        >
          {filteredUsers.length === 0 && !loading ? (
            <div className="text-center">No matching users found.</div>
          ) : (
            filteredUsers.map((user) => {
              const isAlreadyOnCrew = existingCrewUserIds.has(user._id);
              const isJustAdded = addedUserIds.has(user._id);

              return (
                <div
                  key={user._id}
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "0.75rem 0",
                  }}
                >
                  <div style={{ fontWeight: "600" }}>
                    {`${user.firstName || ""} ${user.lastName || ""}`.trim()}
                  </div>
                  <div style={{ fontSize: "0.9rem", color: "#666" }}>
                    {user.email}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "0.5rem",
                      gap: "0.5rem",
                    }}
                  >
                    <label className="form-label" style={{ marginBottom: "0" }}>
                      Role:
                    </label>
                    <select
                      value={roleInputs[user._id] || "Crew"}
                      onChange={(e) =>
                        setRoleInputs((prev) => ({
                          ...prev,
                          [user._id]: e.target.value as CrewRole,
                        }))
                      }
                      className="form-input"
                      style={{ flex: "1" }}
                      disabled={isAlreadyOnCrew || isJustAdded}
                    >
                      {CREW_ROLE_OPTIONS.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>

                    <button
                      className="btn-primary"
                      disabled={
                        addingUserId === user._id ||
                        isAlreadyOnCrew ||
                        isJustAdded
                      }
                      onClick={() => handleAddCrew(user._id)}
                    >
                      {isAlreadyOnCrew
                        ? "Already in Crew"
                        : isJustAdded
                        ? "Added"
                        : addingUserId === user._id
                        ? "Adding..."
                        : "Add"}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="modal-buttons">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
