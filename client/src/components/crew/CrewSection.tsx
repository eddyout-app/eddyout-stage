import { useQuery } from "@apollo/client";
import { GET_CREW_BY_TRIP } from "../../graphql/queries/crewQueries";
import { CrewMember } from "../../types/crew";
import { UserData } from "../../types/user";
import { TripData } from "../../types/trip";
import CrewModal from "./CrewModal";
import InviteCrewModal from "./InviteCrewModal"; // NEW — import the modal
import { useState } from "react";

interface CrewSectionProps {
  trip: TripData;
  user: UserData;
}

export default function CrewSection({ trip, user }: CrewSectionProps) {
  const { data, loading, error, refetch } = useQuery(GET_CREW_BY_TRIP, {
    variables: { tripId: trip._id },
    skip: !trip._id,
  });

  const [editCrewMember, setEditCrewMember] = useState<CrewMember | null>(null);

  // NEW — state to control the InviteCrewModal
  const [showInviteModal, setShowInviteModal] = useState(false);

  // NEW — precompute isLeader once so it’s reusable
  const isLeader = user._id === trip.organizerId;

  const crew: CrewMember[] = data?.crewByTrip || [];

  console.log("Crew members:", crew);

  if (loading) {
    return (
      <div className="text-center mt-10 text-textBody font-body text-lg">
        Loading crew...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 font-body text-lg">
        Error loading crew: {error.message}
      </div>
    );
  }

  return (
    <div className="bg-light-neutral min-h-screen py-10 px-4 font-body text-textBody">
      <h1 className="text-4xl font-header text-primary mb-6 text-center">
        Crew
      </h1>

      <div className="grid grid-cols-3 gap-4 items-center text-center font-semibold mb-2 border-b border-gray-400 pb-2">
        <div>Name</div>
        <div>Role</div>
        <div>Action</div>
      </div>

      {crew.map((member) => {
        const userIdObj = member.userId as { _id: string; fullName: string };

        return (
          <div
            key={member._id}
            className="grid grid-cols-3 gap-4 items-center text-center py-2 border-b border-gray-200"
          >
            <div>{userIdObj?.fullName || "Unknown"}</div>
            <div>{member.role || "—"}</div>
            <div>
              <button
                className="btn-action"
                onClick={() => setEditCrewMember(member)}
              >
                Edit
              </button>
            </div>
          </div>
        );
      })}

      {/* NEW — Invite Crew Member button, visible ONLY to leader */}
      {isLeader && (
        <div className="mt-6 text-center">
          <button
            className="btn-primary"
            onClick={() => setShowInviteModal(true)}
          >
            Invite Crew Member
          </button>
        </div>
      )}

      {/* EXISTING — edit crew modal */}
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

      {/* NEW — InviteCrewModal */}
      {showInviteModal && (
        <InviteCrewModal
          trip={trip}
          onClose={() => setShowInviteModal(false)}
        />
      )}
    </div>
  );
}
