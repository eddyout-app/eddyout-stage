import { useQuery } from "@apollo/client";
import { GET_CREW_MEMBERS } from "../../graphql/queries/crewQueries";
import { CrewMember } from "../../types/crew";
import { TripData } from "../../types/trip";
import { UserData } from "../../types/user";
import CrewModal from "./CrewModal";
import { useState } from "react";

interface CrewSectionProps {
  trip: TripData;
  user: UserData;
}

export default function CrewSection({ trip, user }: CrewSectionProps) {
  const { data, loading, error } = useQuery(GET_CREW_MEMBERS, {
    variables: { tripId: trip._id },
    skip: !trip._id,
  });

  const [editCrew, setEditCrew] = useState<CrewMember | null>(null);

  const crewMembers: CrewMember[] = data?.crewMembersByTrip || [];

  if (loading) {
    return (
      <div className="text-center mt-10 text-textBody font-body text-lg">
        Loading crew members...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500 font-body text-lg">
        Error loading crew members.
      </div>
    );
  }

  return (
    <div className="bg-light-neutral min-h-screen py-10 px-4 font-body text-textBody">
      <h1 className="text-4xl font-header text-primary mb-6 text-center">
        Crew List for {trip.riverName}
      </h1>

      <ul className="space-y-3">
        {crewMembers.map((member) => (
          <li
            key={member._id}
            className="border p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-bold">User ID: {member.userId}</p>
              <p>Role: {member.role?.name ?? "—"}</p>
            </div>
            <button className="btn-action" onClick={() => setEditCrew(member)}>
              Edit
            </button>
          </li>
        ))}
      </ul>

      {editCrew && (
        <CrewModal
          crewMember={editCrew}
          userId={user._id}
          onClose={() => setEditCrew(null)}
          onSave={(updatedMember) => {
            console.log("Updated crew member:", updatedMember);
            setEditCrew(null);
          }}
        />
      )}
    </div>
  );
}
