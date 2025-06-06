import { useQuery } from "@apollo/client";
import { GET_GEAR_ITEMS_BY_TRIP } from "../../graphql/queries/gearQueries";
import { GearItemData } from "../../types/gear";
import GearModal from "./GearModal";
import { useState } from "react";
import { TripData } from "../../types/trip";
import { UserData } from "../../types/user";

interface GearSectionProps {
  trip: TripData;
  user: UserData;
}

export default function GearSection({ trip, user }: GearSectionProps) {
  const {
    data: gearData,
    loading: gearLoading,
    error: gearError,
    refetch: refetchGearItems,
  } = useQuery(GET_GEAR_ITEMS_BY_TRIP, {
    variables: { tripId: trip._id },
    skip: !trip._id,
  });

  const [editGearItem, setEditGearItem] = useState<GearItemData | null>(null);

  const gearItems: GearItemData[] = gearData?.gearItemsByTrip || [];

  const handleAddGearItem = () => {
    const newGearItem: GearItemData = {
      _id: `unclaimed-${Date.now()}`,
      gearItem: "",
      quantity: 1,
      category: "Other",
      userId: user._id,
      tripId: trip._id,
      createdAt: "",
      updatedAt: "",
    };

    setEditGearItem(newGearItem);
  };

  if (gearLoading) {
    return (
      <div className="text-center mt-10 text-textBody font-body text-lg">
        Loading gear...
      </div>
    );
  }

  if (gearError) {
    return (
      <div className="text-center mt-10 text-red-600 font-body text-lg">
        Error loading gear: {gearError.message}
      </div>
    );
  }

  return (
    <div className="bg-light-neutral min-h-screen py-10 px-4 font-body text-textBody">
      <h1 className="text-4xl font-header text-primary mb-6 text-center">
        Trip Gear
      </h1>

      <div className="flex justify-center mb-6">
        <button className="btn-primary" onClick={handleAddGearItem}>
          Assign Yourself Gear
        </button>
      </div>

      <div className="overflow-y-auto max-h-[60vh] pr-2 mx-auto">
        {/* Grid header */}
        <div className="grid grid-cols-4 gap-4 items-center text-center font-semibold mb-2 border-b border-gray-400 pb-2">
          <div>Item</div>
          <div>Quantity</div>
          <div>Assigned To</div>
          <div>Action</div>
        </div>

        {gearItems.map((gear) => {
          const isOwner = gear.userId === user._id;

          return (
            <div
              key={gear._id}
              className="grid grid-cols-4 gap-4 items-center text-center py-2 border-b border-gray-200"
            >
              <div>{gear.gearItem}</div>
              <div>{gear.quantity}</div>
              <div>{isOwner ? "You" : gear.userId}</div>

              <div>
                <button
                  className="btn-action"
                  onClick={() => setEditGearItem(gear)}
                >
                  {isOwner ? "Edit" : "View"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editGearItem && (
        <GearModal
          gearItem={editGearItem}
          userId={user._id}
          tripId={trip._id}
          onClose={() => setEditGearItem(null)}
          onSave={async (updatedGearItem) => {
            console.log("Updated gear item:", updatedGearItem);
            await refetchGearItems();
            setEditGearItem(null);
          }}
        />
      )}
    </div>
  );
}
