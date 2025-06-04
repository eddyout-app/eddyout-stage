import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_GEAR_ITEMS_BY_TRIP } from "../../graphql/queries/gearQueries";
import {
  CREATE_GEAR_ITEM,
  DELETE_GEAR_ITEM,
} from "../../graphql/mutations/gearMutations";
import { GearItem } from "../../types/gear";
import GearModal from "./GearModal";

interface GearSectionProps {
  tripId: string;
  userId: string;
  crewNum: number; // Needed for GearModal V2
}

export default function GearSection({
  tripId,
  userId,
  crewNum,
}: GearSectionProps) {
  const { data, loading, error, refetch } = useQuery(GET_GEAR_ITEMS_BY_TRIP, {
    variables: { tripId },
  });

  const [createGearItem] = useMutation(CREATE_GEAR_ITEM, {
    onCompleted: () => refetch(),
  });

  const [deleteGearItem] = useMutation(DELETE_GEAR_ITEM, {
    onCompleted: () => refetch(),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const gearItems: GearItem[] = data?.gearItemsByTrip || [];

  // Separate your gear vs others' gear
  const yourGear = gearItems.filter((item) => item.claimedBy === userId);
  const otherGear = gearItems.filter(
    (item) => item.claimedBy && item.claimedBy !== userId
  );

  const handleAddGearItem = async (
    formData: Omit<GearItem, "_id" | "claimedBy" | "createdAt" | "updatedAt">
  ) => {
    await createGearItem({
      variables: {
        input: {
          ...formData,
          tripId,
          claimedBy: userId, // This is what marks the item as "yours"
        },
      },
    });
    setIsModalOpen(false);
  };

  const handleDeleteGearItem = async (id: string) => {
    await deleteGearItem({
      variables: { id },
    });
  };

  if (loading) return <p>Loading gear items...</p>;
  if (error) return <p>Error loading gear items: {error.message}</p>;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Gear Items</h3>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Gear Item
      </button>

      {/* Your Gear */}
      <h4 className="text-lg font-semibold mb-1">Your Gear</h4>
      {yourGear.length === 0 ? (
        <p className="text-gray-500 mb-4">You haven't claimed any gear yet.</p>
      ) : (
        <ul className="space-y-2 mb-4">
          {yourGear.map((item) => (
            <li
              key={item._id}
              className="border p-2 flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{item.gearItem}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Category: {item.category}</p>
              </div>
              <button
                onClick={() => handleDeleteGearItem(item._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Other Users' Gear */}
      <h4 className="text-lg font-semibold mb-1">Other Users' Gear</h4>
      {otherGear.length === 0 ? (
        <p className="text-gray-500">No other gear has been claimed yet.</p>
      ) : (
        <ul className="space-y-2">
          {otherGear.map((item) => (
            <li key={item._id} className="border p-2">
              <p className="font-bold">{item.gearItem}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Category: {item.category}</p>
              <p className="italic text-sm">
                Claimed by user: {item.claimedBy}
              </p>
              {/* Later, you can replace claimedBy with the user's name if you populate that */}
            </li>
          ))}
        </ul>
      )}

      {isModalOpen && (
        <GearModal
          tripId={tripId}
          userId={userId}
          crewNum={crewNum} // Pass crewNum for quantity calc
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddGearItem}
        />
      )}
    </div>
  );
}
