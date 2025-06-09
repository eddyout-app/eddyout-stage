import { useQuery, useMutation } from "@apollo/client";
import { GET_CREW_BY_TRIP } from "../../graphql/queries/crewQueries";
import { REMOVE_CREW_MEMBER } from "../../graphql/mutations/crewMutations";
import { CrewMember } from "../../types/crew";
import { UserData } from "../../types/user";
import { TripData } from "../../types/trip";
import CrewModal from "./EditCrewModal";
import InviteCrewModal from "./InviteCrewModal";
import AddCrewModal from "./AddCrewModal";
import { useState } from "react";

import "../../styles/sections.css";

interface CrewSectionProps {
  trip: TripData;
  user: UserData;
}

export default function CrewSection({ trip, user }: CrewSectionProps) {
  const { data, loading, error, refetch } = useQuery(GET_CREW_BY_TRIP, {
    variables: { tripId: trip._id },
    skip: !trip._id,
  });

  const [removeCrewMember] = useMutation(REMOVE_CREW_MEMBER);

  const [editCrewMember, setEditCrewMember] = useState<CrewMember | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const isLeader = user._id === trip.organizerId;
  const crew: CrewMember[] = data?.crewByTrip || [];

  const handleRemoveCrewMember = async (crewMemberId: string) => {
    try {
      await removeCrewMember({
        variables: {
          crewMemberId,
        },
      });
      console.log(`Removed crew member ${crewMemberId}`);
      await refetch();
    } catch (err) {
      console.error("Error removing crew member:", err);
    }
  };

  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading crew...</p>
    );
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
        Error loading crew: {error.message}
      </p>
    );
  }

  return (
    <div className="section-container">
      <h1>Crew</h1>

      <div className="planner-grid">
        <div
          className="planner-grid-header"
          style={{ gridTemplateColumns: isLeader ? "1fr 1fr auto" : "1fr 1fr" }}
        >
          <div>Name</div>
          <div>Role</div>
          {isLeader && <div>Action</div>}
        </div>

        {crew.map((member) => {
          const userIdObj = member.userId as { _id: string; fullName: string };

          return (
            <div
              key={member._id}
              className="planner-grid-row"
              style={{
                gridTemplateColumns: isLeader ? "1fr 1fr auto" : "1fr 1fr",
              }}
            >
              <div>{userIdObj?.fullName || "Unknown"}</div>
              <div>{member.role || "—"}</div>

              {isLeader && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "4px",
                  }}
                >
                  <div
                    className="inline-action"
                    onClick={() => setEditCrewMember(member)}
                  >
                    Edit <span className="arrow">→</span>
                  </div>

                  <div
                    className="inline-action"
                    onClick={() => handleRemoveCrewMember(member._id)}
                  >
                    Remove <span className="arrow">→</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Leader-only buttons */}
      {isLeader && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            className="btn-primary"
            onClick={() => setShowInviteModal(true)}
            style={{ marginRight: "1rem" }}
          >
            Invite Crew Member
          </button>

          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            Add Crew Member
          </button>
        </div>
      )}

      {/* Edit crew modal */}
      {editCrewMember && (
        <CrewModal
          crewMember={editCrewMember}
          userId={user._id}
          isLeader={isLeader}
          onClose={() => setEditCrewMember(null)}
          onSave={async (updatedMember) => {
            console.log("Updated crew member:", updatedMember);
            await refetch();
            setEditCrewMember(null);
          }}
        />
      )}

      {/* Invite Crew Modal */}
      {showInviteModal && (
        <InviteCrewModal
          trip={trip}
          onClose={() => setShowInviteModal(false)}
        />
      )}

      {/* Add Crew Modal */}
      {showAddModal && (
        <AddCrewModal
          trip={trip}
          onClose={async () => {
            setShowAddModal(false);
            await refetch(); // Refresh crew after adding!
          }}
        />
      )}
    </div>
  );
}
