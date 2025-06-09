import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS } from "../../graphql/queries/userQueries";
import { GET_CREW_BY_TRIP } from "../../graphql/queries/crewQueries";
import { ADD_CREW_MEMBER } from "../../graphql/mutations/crewMutations";
import { TripData } from "../../types/trip";
import { UserData } from "../../types/user";
import { CrewRole, CREW_ROLE_OPTIONS } from "../../types/roles";
import { useState } from "react";
import { CrewMember } from "../../types/crew";
interface AddCrewModalProps {
  trip: TripData;
  onClose: () => void;
}

export default function AddCrewModal({ trip, onClose }: AddCrewModalProps) {
  const { data, loading, error } = useQuery(GET_USERS);
  const { data: crewData, loading: crewLoading } = useQuery(GET_CREW_BY_TRIP, {
    variables: { tripId: trip._id },
    skip: !trip._id,
  });

  const [addCrewMember] = useMutation(ADD_CREW_MEMBER);

  const [search, setSearch] = useState("");
  const [addingUserId, setAddingUserId] = useState<string | null>(null);
  const [roleInputs, setRoleInputs] = useState<{ [userId: string]: CrewRole }>(
    {}
  );
  const [addedUserIds, setAddedUserIds] = useState<Set<string>>(new Set()); // ✅ NEW

  const allUsers: UserData[] = data?.users || [];

  // Build Set of existing crew userIds
  const existingCrewUserIds = new Set(
    (crewData?.crewByTrip || []).map((member: CrewMember) =>
      typeof member.userId === "string" ? member.userId : member.userId._id
    )
  );

  // Simple search filter: match on name or email
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

      // ✅ After success → track added user
      setAddedUserIds((prev) => new Set(prev).add(userId));

      // Optional: clear role input for this user (optional, can keep or remove)
      // setRoleInputs((prev) => {
      //   const newInputs = { ...prev };
      //   delete newInputs[userId];
      //   return newInputs;
      // });
    } catch (err) {
      console.error("Error adding crew member:", err);
    } finally {
      setAddingUserId(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-header mb-4 text-primary text-center">
          Add Crew Member
        </h2>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Loading/Error */}
        {(loading || crewLoading) && (
          <div className="text-center text-textBody mb-4">Loading users...</div>
        )}

        {error && (
          <div className="text-center text-red-600 mb-4">
            Error loading users: {error.message}
          </div>
        )}

        {/* User list */}
        <div className="max-h-64 overflow-y-auto mb-6">
          {filteredUsers.length === 0 && !loading ? (
            <div className="text-center text-textBody">
              No matching users found.
            </div>
          ) : (
            filteredUsers.map((user) => {
              const isAlreadyOnCrew = existingCrewUserIds.has(user._id);
              const isJustAdded = addedUserIds.has(user._id);

              return (
                <div
                  key={user._id}
                  className="flex flex-col border-b py-2 space-y-2"
                >
                  {/* User name + email */}
                  <div>
                    <div className="font-semibold">
                      {`${user.firstName || ""} ${user.lastName || ""}`.trim()}
                    </div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>

                  {/* Role dropdown + Add button */}
                  <div className="flex items-center space-x-3">
                    <label className="font-medium">Role:</label>
                    <select
                      value={roleInputs[user._id] || "Crew"}
                      onChange={(e) =>
                        setRoleInputs((prev) => ({
                          ...prev,
                          [user._id]: e.target.value as CrewRole,
                        }))
                      }
                      className="flex-1 border border-gray-300 rounded px-2 py-1"
                      disabled={isAlreadyOnCrew || isJustAdded}
                    >
                      {CREW_ROLE_OPTIONS.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    <button
                      className={`btn-primary ${
                        isAlreadyOnCrew || isJustAdded
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
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

        {/* Modal Close */}
        <div className="flex justify-end space-x-3 mt-6">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
