// components/gear/GearModal.tsx

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GearItemData, GearCatalogItemData } from "../../types/gear";
import {
  CREATE_GEAR_ITEM,
  UPDATE_GEAR_ITEM,
} from "../../graphql/mutations/gearMutations";
import {
  GET_GEAR_ITEMS_BY_TRIP,
  GET_GEAR_CATALOG_ITEMS,
} from "../../graphql/queries/gearQueries";

interface GearModalProps {
  gearItem: GearItemData;
  userId: string;
  tripId: string;
  onClose: () => void;
  onSave: (updatedGearItem: GearItemData) => void;
}

export default function GearModal({
  gearItem,
  userId,
  tripId,
  onClose,
  onSave,
}: GearModalProps) {
  const { data: catalogData } = useQuery(GET_GEAR_CATALOG_ITEMS);

  const [category, setCategory] = useState(gearItem.category || "Other");
  const [itemName, setItemName] = useState(gearItem.gearItem || "");
  const [quantity, setQuantity] = useState(gearItem.quantity || 1);

  const [createGearItem] = useMutation(CREATE_GEAR_ITEM);
  const [updateGearItem] = useMutation(UPDATE_GEAR_ITEM);

  const handleSave = async () => {
    try {
      let updatedGearItem: GearItemData;

      if (gearItem._id.startsWith("unclaimed")) {
        const result = await createGearItem({
          variables: {
            input: {
              gearItem: itemName,
              quantity: quantity,
              category: category,
              tripId: tripId,
              userId: userId,
            },
          },
          refetchQueries: [
            { query: GET_GEAR_ITEMS_BY_TRIP, variables: { tripId } },
          ],
        });

        updatedGearItem = result.data.createGearItem;
      } else {
        const result = await updateGearItem({
          variables: {
            id: gearItem._id,
            input: {
              gearItem: itemName,
              quantity: quantity,
              category: category,
              userId: userId,
            },
          },
          refetchQueries: [
            { query: GET_GEAR_ITEMS_BY_TRIP, variables: { tripId } },
          ],
        });

        updatedGearItem = result.data.updateGearItem;
      }

      onSave(updatedGearItem);
      onClose();
    } catch (err) {
      console.error("Error saving gear item:", err);
    }
  };

  const canEdit =
    (gearItem.userId && gearItem.userId === userId) ||
    gearItem._id.startsWith("unclaimed");

  if (!canEdit) {
    return null;
  }

  // Extract categories from catalog
  const categories: string[] = Array.from(
    new Set(
      catalogData?.gearCatalogItems.map(
        (item: GearCatalogItemData) => item.category
      )
    )
  );

  // Filter items by selected category
  const itemsInCategory = catalogData?.gearCatalogItems
    .filter((item: GearCatalogItemData) => item.category === category)
    .map((item: GearCatalogItemData) => item.itemName);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-header mb-4">
          {gearItem._id.startsWith("unclaimed")
            ? "Add Gear Item"
            : "Edit Gear Item"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          {/* Category select */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setItemName(""); // reset item when category changes
              }}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              {categories.map((cat: string) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Item select OR freeform input if "Other" */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Item</label>
            {category === "Other" ? (
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            ) : (
              <select
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="" disabled>
                  Select Item
                </option>
                {itemsInCategory?.map((itemName: string) => (
                  <option key={itemName} value={itemName}>
                    {itemName}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {gearItem._id.startsWith("unclaimed")
                ? "Add Gear"
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
