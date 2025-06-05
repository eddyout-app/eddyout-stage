import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_GEAR_CATALOG_ITEMS } from "../../graphql/queries/gearCatalog";
import { GearCatalogItem } from "../../types/gearCatalog";
import { GearItem } from "../../types/gear";

interface GearModalProps {
  tripId: string;
  userId: string;
  crewNum: number; // Pass this so we can calculate!
  onClose: () => void;
  onSave: (
    formData: Omit<GearItem, "_id" | "claimedBy" | "createdAt" | "updatedAt">
  ) => void;
}

export default function GearModal({
  tripId,
  crewNum,
  onClose,
  onSave,
}: GearModalProps) {
  const { data } = useQuery(GET_GEAR_CATALOG_ITEMS);

  const catalogItems: GearCatalogItem[] = data?.gearCatalogItems || [];

  const [selectedCatalogId, setSelectedCatalogId] = useState<string>("");
  const [gearItemName, setGearItemName] = useState<string>("");
  const [category, setCategory] = useState<string>("Other");
  const [quantity, setQuantity] = useState<number>(1);
  const [customMode, setCustomMode] = useState<boolean>(false);

  // Auto-update fields when catalog item selected
  useEffect(() => {
    if (selectedCatalogId) {
      const selectedItem = catalogItems.find(
        (item) => item._id === selectedCatalogId
      );
      if (selectedItem) {
        setGearItemName(selectedItem.itemName);
        setCategory(selectedItem.category);

        if (selectedItem.perPersonQty && selectedItem.perPersonQty > 0) {
          setQuantity(Math.ceil(selectedItem.perPersonQty * crewNum));
        } else {
          setQuantity(1);
        }

        setCustomMode(false);
      }
    }
  }, [selectedCatalogId, catalogItems, crewNum]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      gearItem: gearItemName,
      quantity,
      category,
      tripId,
      gearListId: "", // If you wire GearList later
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Add Gear Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!customMode && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Select Item:
              </label>
              <select
                value={selectedCatalogId}
                onChange={(e) => setSelectedCatalogId(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">-- Choose an item --</option>
                {catalogItems.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.itemName} ({item.category})
                  </option>
                ))}
              </select>
            </div>
          )}

          {customMode && (
            <>
              <div>
                <label className="block text-sm font-medium">Item Name:</label>
                <input
                  type="text"
                  value={gearItemName}
                  onChange={(e) => setGearItemName(e.target.value)}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Category:</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="Kitchen">Kitchen</option>
                  <option value="Boat Gear">Boat Gear</option>
                  <option value="Camp Gear">Camp Gear</option>
                  <option value="Personal">Personal</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min={1}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex justify-between items-center mt-2">
            <button
              type="button"
              onClick={() => setCustomMode((prev) => !prev)}
              className="text-blue-500 hover:underline"
            >
              {customMode ? "← Use Catalog" : "Add Custom Item"}
            </button>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={!gearItemName || quantity < 1}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
