// import { useQuery, useMutation } from "@apollo/client";
// import { useState, useEffect } from "react";
// import { GET_USER_BY_ID } from "../../graphql/queries/userQueries";
// import { UPDATE_USER_PROFILE } from "../../graphql/mutations/userMutations";
// import { UserData } from "../../types/user";
// import ProfileSectionCard from "./ProfileSectionCard";

// interface UserProfileProps {
//   user: UserData | null;
// }

// export default function UserProfile({ user }: UserProfileProps) {
//   const { data: userData, refetch } = useQuery(GET_USER_BY_ID, {
//     variables: { _id: user?._id },
//     skip: !user?._id,
//   });

//   const [updateUserData] = useMutation(UPDATE_USER_PROFILE);

//   const [username, setUsername] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");

//   const [openSection, setOpenSection] = useState<string | null>(null);

//   const handleSectionToggle = (section: string) => {
//     setOpenSection(openSection === section ? null : section);
//   };

//   useEffect(() => {
//     if (!userData?.user) return;
//     const user = userData.user;
//     setUsername(user.username ?? "");
//     setFirstName(user.firstName ?? "");
//     setLastName(user.lastName ?? "");
//   }, [userData]);

//   const handleSavePreferences = async () => {
//     if (!userData?.user?._id) return alert("User data is still loading.");
//     try {
//       await updateUserData({
//         variables: {
//           id: userData.user._id,
//           username,
//           firstName,
//           lastName,
//         },
//       });
//       await refetch();
//       alert("Profile updated!");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Failed to update profile. Please try again.");
//     }
//   };

//   return (
//     <div className="section-container">
//       <h1>My Profile</h1>
//       <p className="description">
//         Click any section below to view or edit your profile details.
//       </p>

//       <ProfileSectionCard
//         title="Basic Info"
//         isOpen={openSection === "basic"}
//         onToggle={() => handleSectionToggle("basic")}
//         onSave={handleSavePreferences}
//         fields={[
//           { label: "Username", value: username, onChange: setUsername },
//           { label: "First Name", value: firstName, onChange: setFirstName },
//           { label: "Last Name", value: lastName, onChange: setLastName },
//         ]}
//       />
//     </div>
//   );
// }
