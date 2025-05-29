import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { GearItem as GearItemInterface } from "../interfaces/GearItemData";
import { TripData } from "../interfaces/TripData";
import GearItem from "../components/GearItem";

export default function GearList() {
  const { trip } = useOutletContext<{ trip: TripData }>();
  const userId = 1;
  const [gearItems, setGearItems] = useState<GearItemInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [showForm, setShowForm] = useState(false);
  const [newItemName, setNewItemName] = useState("");

  const fetchGearItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/trips/${trip.id}/gear`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch gear items");
      }
      const data: GearItemInterface[] = await response.json();
      setGearItems(data);
    } catch (error) {
      console.error("Error fetching gear items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimToggle = async (itemId: number) => {
    try {
      await fetch(`/api/gear/${itemId}/claim`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      fetchGearItems();
    } catch (error) {
      console.error("Error toggling claim:", error);
    }
  };

  const handleAddGear = async () => {
    if (!newItemName.trim()) return;

    try {
      console.log("Sending new gear item:", newItemName);

      const response = await fetch(`/api/trips/${trip.id}/gear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newItemName,
          claimedBy: null,
          tripId: trip.id,
        }),
      });

      const result = await response.json();
      console.log("Response from server:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to add gear item");
      }

      setNewItemName("");
      setShowForm(false);
      fetchGearItems();
    } catch (error) {
      console.error("Error adding gear item:", error);
      alert(`Error adding gear item: ${error}`);
    }
  };

  useEffect(() => {
    if (trip?.id) {
      fetchGearItems();
    }
  }, [trip]);

  return (
    <div className="bg-light-neutral min-h-screen py-10 px-4 font-body text-textBody">
      <h1 className="text-4xl font-header text-primary mb-6 text-center">
        Gear List
      </h1>

      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center mb-4">
          <button className="btn-dark" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "Add Gear Item"}
          </button>
        </div>

        {showForm && (
          <div className="mb-6 space-y-2">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Enter gear item name"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <button className="btn-dark" onClick={handleAddGear}>
              Submit
            </button>
          </div>
        )}

        {loading ? (
          <p className="text-center">Loading gear items...</p>
        ) : gearItems.length === 0 ? (
          <p className="text-center">No gear items found for this trip.</p>
        ) : (
          <ul className="space-y-4">
            {gearItems.map((item) => (
              <GearItem
                key={item.id}
                item={item}
                userId={userId}
                onClaimToggle={handleClaimToggle}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
