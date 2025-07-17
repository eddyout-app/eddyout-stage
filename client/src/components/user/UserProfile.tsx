import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_USER_BY_ID } from "../../graphql/queries/userQueries";
import { GET_USER_PREFERENCES } from "../../graphql/queries/userPreferencesQueries";
import { UPDATE_USER_PROFILE } from "../../graphql/mutations/userMutations";
import { UPDATE_USER_PREFERENCES } from "../../graphql/mutations/userPreferencesMutations";
import { UserData } from "../../types/user";
import ProfileSectionCard from "./ProfileSectionCard";

interface UserProfileProps {
  user: UserData | null;
}

const MEDICAL_TRAINING_LEVELS = [
  "None",
  "Basic First Aid",
  "CPR Certified",
  "Wilderness First Responder (WFR)",
  "Emergency Medical Technician (EMT)",
  "Paramedic or Higher",
];

export default function UserProfile({ user }: UserProfileProps) {
  const { data: userData, refetch } = useQuery(GET_USER_BY_ID, {
    variables: { _id: user?._id },
    skip: !user?._id,
  });

  const { data: preferencesData, refetch: refetchPreferences } = useQuery(
    GET_USER_PREFERENCES,
    {
      variables: { _id: user?._id },
      skip: !user?._id,
    }
  );
  const [updateUserData] = useMutation(UPDATE_USER_PROFILE);
  const [updateUserPreferences] = useMutation(UPDATE_USER_PREFERENCES);

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [phone, setPhone] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [medicalTraining, setMedicalTraining] = useState("");
  const [preferredPaymentMethod, setPreferredPaymentMethod] = useState("");
  const [paymentHandle, setPaymentHandle] = useState("");
  // const [avatar, setAvatar] = useState("");

  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleSectionToggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  useEffect(() => {
    if (!userData?.user) return;

    const user = userData.user;
    setUsername(user.username ?? "");
    setFirstName(user.firstName ?? "");
    setLastName(user.lastName ?? "");

    const prefs = preferencesData?.getUserPreferences ?? {};
    setDietaryRestrictions(prefs.dietaryRestrictions?.join(", ") ?? "");
    setPhone(prefs.phone ?? "");
    setAllergies(prefs.allergies ?? "");
    setMedicalConditions(prefs.medicalConditions ?? "");
    setEmergencyContactName(prefs.emergencyContactName ?? "");
    setEmergencyContactPhone(prefs.emergencyContactPhone ?? "");
    setMedicalTraining(prefs.medicalTraining ?? "");
    setPreferredPaymentMethod(prefs.preferredPaymentMethod ?? "");
    setPaymentHandle(prefs.paymentHandle ?? "");
    // setAvatar(prefs.avatar ?? "");
  }, [userData, preferencesData]);

  const handleSavePreferences = async () => {
    if (!userData?.user?._id) return alert("User data is still loading.");
    try {
      await updateUserData({
        variables: {
          id: userData.user._id,
          username,
          firstName,
          lastName,
        },
      });

      await updateUserPreferences({
        variables: {
          id: userData.user._id,
          dietaryRestrictions: dietaryRestrictions
            .split(",")
            .map((s) => s.trim()),
          phone,
          allergies,
          medicalConditions,
          emergencyContactName,
          emergencyContactPhone,
          medicalTraining,
          preferredPaymentMethod,
          paymentHandle,
        },
      });

      await refetch(); // user basic info
      const newPrefs = await refetchPreferences();
      const prefs = newPrefs?.data?.getUserPreferences ?? {};

      setDietaryRestrictions(prefs.dietaryRestrictions?.join(", ") ?? "");
      setPhone(prefs.phone ?? "");
      setAllergies(prefs.allergies ?? "");
      setMedicalConditions(prefs.medicalConditions ?? "");
      setEmergencyContactName(prefs.emergencyContactName ?? "");
      setEmergencyContactPhone(prefs.emergencyContactPhone ?? "");
      setMedicalTraining(prefs.medicalTraining ?? "");
      setPreferredPaymentMethod(prefs.preferredPaymentMethod ?? "");
      setPaymentHandle(prefs.paymentHandle ?? "");

      alert("Profile updated!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="section-container">
      <h1>My Profile</h1>
      <p className="description">
        Click any section below to view or edit your profile details.
      </p>

      <ProfileSectionCard
        title="Basic Info"
        isOpen={openSection === "basic"}
        onToggle={() => handleSectionToggle("basic")}
        onSave={handleSavePreferences}
        fields={[
          { label: "Username", value: username, onChange: setUsername },
          { label: "First Name", value: firstName, onChange: setFirstName },
          { label: "Last Name", value: lastName, onChange: setLastName },
        ]}
      />
      <ProfileSectionCard
        title="Contact Info"
        isOpen={openSection === "contact"}
        onToggle={() => handleSectionToggle("contact")}
        onSave={handleSavePreferences}
        fields={[
          { label: "Phone", value: phone, onChange: setPhone },
          {
            label: "Emergency Contact Name",
            value: emergencyContactName,
            onChange: setEmergencyContactName,
          },
          {
            label: "Emergency Contact Phone",
            value: emergencyContactPhone,
            onChange: setEmergencyContactPhone,
          },
        ]}
      />

      <ProfileSectionCard
        title="Preferences"
        isOpen={openSection === "preferences"}
        onToggle={() => handleSectionToggle("preferences")}
        onSave={handleSavePreferences}
        fields={[
          {
            label: "Dietary Restrictions (comma separated)",
            value: dietaryRestrictions,
            onChange: setDietaryRestrictions,
          },
          { label: "Allergies", value: allergies, onChange: setAllergies },
          {
            label: "Medical Conditions",
            value: medicalConditions,
            onChange: setMedicalConditions,
          },
          {
            label: "Medical Training Level",
            value: medicalTraining,
            onChange: setMedicalTraining,
            type: "select",
            options: MEDICAL_TRAINING_LEVELS,
          },
        ]}
      />

      <ProfileSectionCard
        title="Payment Info"
        isOpen={openSection === "payment"}
        onToggle={() => handleSectionToggle("payment")}
        onSave={handleSavePreferences}
        fields={[
          {
            label: "Preferred Payment Method",
            value: preferredPaymentMethod,
            onChange: setPreferredPaymentMethod,
          },
          {
            label: "Payment Handle",
            value: paymentHandle,
            onChange: setPaymentHandle,
          },
        ]}
      />
    </div>
  );
}
