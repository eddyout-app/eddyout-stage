import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_ME } from "../../graphql/queries/userQueries";
import { GET_USER_PREFERENCES } from "../../graphql/queries/userPreferencesQueries";
import { UPDATE_USER_PREFERENCES } from "../../graphql/mutations/userPreferencesMutations";
import { UserData } from "../../types/user";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  onSave: () => void;
}

function ProfileSection({
  title,
  children,
  isOpen,
  onToggle,
  onSave,
}: SectionProps) {
  return (
    <div className="mb-6 border border-gray-300 rounded p-4">
      <button
        className="text-xl font-header text-primary mb-4 w-full text-left"
        onClick={onToggle}
      >
        {title}
      </button>
      {isOpen && (
        <>
          <div className="space-y-4">{children}</div>
          <div className="flex justify-end mt-4">
            <button className="btn-primary" onClick={onSave}>
              Save Changes
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function UserProfile() {
  const { data: userData } = useQuery(GET_ME);
  const user: UserData = userData?.me;

  const { data: preferencesData, refetch } = useQuery(GET_USER_PREFERENCES, {
    variables: { userId: user?._id },
    skip: !user?._id,
  });

  const [updateUserPreferences] = useMutation(UPDATE_USER_PREFERENCES);

  const preferences = preferencesData?.getUserPreferences || {};

  // Local state
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string>("");
  const [venmoHandle, setVenmoHandle] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [allergies, setAllergies] = useState<string>("");
  const [medicalConditions, setMedicalConditions] = useState<string>("");
  const [emergencyContactName, setEmergencyContactName] = useState<string>("");
  const [emergencyContactPhone, setEmergencyContactPhone] =
    useState<string>("");
  const [medicalTraining, setMedicalTraining] = useState<boolean>(false);
  const [preferredPaymentMethod, setPreferredPaymentMethod] =
    useState<string>("");
  const [paymentHandle, setPaymentHandle] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  // Sync local state when preferencesData loads
  useEffect(() => {
    if (preferencesData?.getUserPreferences) {
      const prefs = preferencesData.getUserPreferences;
      setDietaryRestrictions(prefs.dietaryRestrictions?.join(", ") || "");
      setVenmoHandle(prefs.venmoHandle || "");
      setPhone(prefs.phone || "");
      setAllergies(prefs.allergies || "");
      setMedicalConditions(prefs.medicalConditions || "");
      setEmergencyContactName(prefs.emergencyContactName || "");
      setEmergencyContactPhone(prefs.emergencyContactPhone || "");
      setMedicalTraining(prefs.medicalTraining || false);
      setPreferredPaymentMethod(prefs.preferredPaymentMethod || "");
      setPaymentHandle(prefs.paymentHandle || "");
      setAvatar(prefs.avatar || "");
    }
  }, [preferencesData]);

  // Section toggle
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleSectionToggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePreferences = async () => {
    if (!user?._id) {
      alert("User data is still loading. Please try again.");
      return;
    }

    await updateUserPreferences({
      variables: {
        userId: user._id,
        dietaryRestrictions: dietaryRestrictions
          .split(",")
          .map((s) => s.trim()),
        venmoHandle,
        phone,
        allergies,
        medicalConditions,
        emergencyContactName,
        emergencyContactPhone,
        medicalTraining,
        preferredPaymentMethod,
        paymentHandle,
        avatar,
      },
    });
    await refetch();
    alert("Preferences saved!");
  };

  return (
    <div className="bg-light-neutral min-h-screen py-10 px-4 font-body text-textBody max-w-3xl mx-auto">
      <h1 className="text-4xl font-header text-primary mb-8 text-center">
        My Profile
      </h1>

      <ProfileSection
        title="Basic Info"
        isOpen={openSection === "basic"}
        onToggle={() => handleSectionToggle("basic")}
        onSave={handleSavePreferences}
      >
        <div>
          <label className="block mb-1 font-medium">Avatar</label>
          {avatar && (
            <img
              src={avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full mb-2"
            />
          )}
          <label className="btn-primary cursor-pointer inline-block">
            Upload Avatar
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </label>
        </div>
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            value={user?.username || ""}
            disabled
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="text"
            value={user?.email || ""}
            disabled
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">First Name</label>
          <input
            type="text"
            value={user?.firstName || ""}
            disabled
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Last Name</label>
          <input
            type="text"
            value={user?.lastName || ""}
            disabled
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </ProfileSection>

      {/* --- Contact Info Section --- */}
      <ProfileSection
        title="Contact Info"
        isOpen={openSection === "contact"}
        onToggle={() => handleSectionToggle("contact")}
        onSave={handleSavePreferences}
      >
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">
            Emergency Contact Name
          </label>
          <input
            type="text"
            value={emergencyContactName}
            onChange={(e) => setEmergencyContactName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">
            Emergency Contact Phone
          </label>
          <input
            type="text"
            value={emergencyContactPhone}
            onChange={(e) => setEmergencyContactPhone(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </ProfileSection>

      {/* --- Preferences Section --- */}
      <ProfileSection
        title="Preferences"
        isOpen={openSection === "preferences"}
        onToggle={() => handleSectionToggle("preferences")}
        onSave={handleSavePreferences}
      >
        <div>
          <label className="block mb-1 font-medium">
            Dietary Restrictions (comma separated)
          </label>
          <input
            type="text"
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Allergies</label>
          <input
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Medical Conditions</label>
          <input
            type="text"
            value={medicalConditions}
            onChange={(e) => setMedicalConditions(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Medical Training</label>
          <input
            type="checkbox"
            checked={medicalTraining}
            onChange={(e) => setMedicalTraining(e.target.checked)}
            className="mr-2"
          />
          Yes
        </div>
      </ProfileSection>

      {/* --- Payment Info Section --- */}
      <ProfileSection
        title="Payment Info"
        isOpen={openSection === "payment"}
        onToggle={() => handleSectionToggle("payment")}
        onSave={handleSavePreferences}
      >
        <div>
          <label className="block mb-1 font-medium">
            Preferred Payment Method
          </label>
          <input
            type="text"
            value={preferredPaymentMethod}
            onChange={(e) => setPreferredPaymentMethod(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Payment Handle</label>
          <input
            type="text"
            value={paymentHandle}
            onChange={(e) => setPaymentHandle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Venmo Handle</label>
          <input
            type="text"
            value={venmoHandle}
            onChange={(e) => setVenmoHandle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </ProfileSection>
    </div>
  );
}
