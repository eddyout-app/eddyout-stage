import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS } from "../../graphql/queries/userQueries";
import { ADD_CREW_MEMBER } from "../../graphql/mutations/crewMutations";
import { TripData } from "../../types/trip";
import { UserData } from "../../types/user";
import { useState } from "react";

interface AddCrewModalProps {
  trip: TripData;
  onClose: () => void;
}

export default function AddCrewModal({ trip, onClose }: AddCrewModalProps) {
  const { data, loading, error } = useQuery(GET_USERS);

  const [addCrewMember] = useMutation(ADD_CREW_MEMBER);

  const [search, setSearch] = useState("");
  const [addingUserId, setAddingUserId] = useState<string | null>(null);

  const allUsers: UserData[] = data?.users || [];

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
    try {
      setAddingUserId(userId);
      await addCrewMember({
        variables: {
          tripId: trip._id,
          userId,
          role: "Crew", // Default role, can be changed later
        },
      });
      console.log(`User ${userId} added to crew!`);
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

        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {loading && (
          <div className="text-center text-textBody mb-4">Loading users...</div>
        )}

        {error && (
          <div className="text-center text-red-600 mb-4">
            Error loading users: {error.message}
          </div>
        )}

        <div className="max-h-64 overflow-y-auto mb-6">
          {filteredUsers.length === 0 && !loading ? (
            <div className="text-center text-textBody">
              No matching users found.
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <div className="font-semibold">
                    `${user.firstName || ""} ${user.lastName || ""}`.trim()
                  </div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                </div>
                <button
                  className="btn-primary"
                  disabled={addingUserId === user._id}
                  onClick={() => handleAddCrew(user._id)}
                >
                  {addingUserId === user._id ? "Adding..." : "Add"}
                </button>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
