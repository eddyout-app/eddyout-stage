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
      <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading gear...</p>
    );
  }

  if (gearError) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
        Error loading gear: {gearError.message}
      </p>
    );
  }

  return (
    <div className="section-container">
      <h1>Trip Gear</h1>

      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <button className="btn-primary" onClick={handleAddGearItem}>
          Assign Yourself Gear
        </button>
      </div>

      <div className="planner-grid">
        <div className="planner-grid-header">
          <div>Item</div>
          <div>Quantity</div>
          <div>Assigned To</div>
          <div>Action</div>
        </div>

        {gearItems.map((gear) => {
          const isOwner = gear.userId === user._id;

          return (
            <div key={gear._id} className="planner-grid-row">
              <div>{gear.gearItem}</div>
              <div>{gear.quantity}</div>
              <div>{isOwner ? "You" : gear.userId}</div>

              <div>
                <div
                  className="inline-action"
                  onClick={() => setEditGearItem(gear)}
                >
                  {isOwner ? "Edit" : "View"} <span className="arrow">→</span>
                </div>
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
