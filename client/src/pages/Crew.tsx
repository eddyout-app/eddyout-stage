import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { TripData } from "../interfaces/TripData";
import { UserData } from "../interfaces/UserData";
import { CrewData } from "../interfaces/CrewData";
import {
  retrieveCrew,
  retrieveUser,
  retrieveAllUsers,
  addCrewMember,
  deleteCrew,
} from "../api/crewAPI";
// import { response } from "express";

export default function Crew() {
  const { trip } = useOutletContext<{ trip: TripData }>();
  const [crew, setCrew] = useState<CrewData[]>([]);
  const [user, setUser] = useState<UserData | null>(null);
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  // const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    async function fetchCrew() {
      const token = localStorage.getItem("id_token");
      const userId = localStorage.getItem("userId");
      if (!token) {
        console.error("No auth token found");
        return;
      }

      try {
        const crewRes = await retrieveCrew(trip.id);
        const userRes = await retrieveUser(userId);
        const usersRes = await retrieveAllUsers();

        if (!userRes) {
          throw new Error("Failed to fetch user data");
        }
        if (!crewRes) {
          throw new Error("Failed to fetch crew data");
        }

        setUser(userRes);
        setCrew(crewRes);
        setAllUsers(usersRes);
      } catch (err) {
        console.error("Error fetching crew or user data", err);
      }
    }

    if (trip?.id) {
      fetchCrew();
    }
  }, [refreshKey]);

  async function handleJoinCrew() {
    const token = localStorage.getItem("id_token");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    if (!selectedUserId) {
      console.error("No user selected");
      return;
    }

    try {
      const addedCrewMember = await addCrewMember(trip.id, selectedUserId);
      if (!addedCrewMember) {
        throw new Error("Failed to add user to crew");
      }

      setRefreshKey((prevKey) => prevKey + 1);
      setSelectedUserId(null);
    } catch (err) {
      console.error("Error adding user to crew:", err);
    }
  }
  // const handleUpdate = async (userId: string, body:string) => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     console.error("No auth token found");
  //     return;
  //   }
  //   try {
  //     const updateUser = await updateCrew(userId, body)
  //     if (!updateUser) {
  //       throw new Error("Failed to delete user from crew");
  //     }
  //     setRefreshKey((prevKey) => prevKey + 1)
  //   } catch (err) {
  //     console.log("Error deleting user", err);
  //   }
  // }
  const handleDelete = async (crewId: string) => {
    const token = localStorage.getItem("id_token");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    try {
      const deleteUser = await deleteCrew(crewId);
      if (!deleteUser) {
        throw new Error("Failed to delete user from crew");
      }
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(user);
  if (!user) {
    return (
      <div className="text-center mt-10 text-textBody font-body text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-light-neutral min-h-screen py-10 px-4 font-body text-textBody">
      <h1 className="text-4xl font-header text-primary mb-6 text-center">
        Trip Crew
      </h1>

      {crew.length === 0 ? (
        <p className="text-center">No crew assigned to this trip yet.</p>
      ) : (
        <ul className="space-y-2 max-w-3xl mx-auto">
          {crew.map((member) => (
            <li
              key={member.user.id}
              className="bg-white rounded-md shadow-sm px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">
                    {member.user.firstName || ""} {member.user.lastName || ""}
                  </span>
                  <span className="text-sm text-gray-500">
                    {member.user.username}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {member.user.email}
                </span>
              </div>

              <button
                onClick={() => handleDelete(member.id)}
                className="text-red-600 hover:text-red-800 px-3 py-1 rounded-md text-sm transition duration-150"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-header text-primary mb-4">
          Add a Crew Member
        </h2>
        <select
          value={selectedUserId || ""}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="" disabled>
            Select a user by email
          </option>
          {allUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
          ))}
        </select>
        <button
          onClick={handleJoinCrew}
          className="btn-dark ml-4 bg-primary text-white px-6 py-2 rounded shadow hover:bg-primary-dark"
        >
          Add to Crew
        </button>
      </div>
    </div>
  );
}
