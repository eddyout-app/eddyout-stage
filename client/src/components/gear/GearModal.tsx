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

import "../../styles/modal.css"; // ✅ GLOBAL modal styles

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
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>
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
          {/* Category */}
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setItemName(""); // reset item when category changes
              }}
              className="form-input"
              required
            >
              {categories.map((cat: string) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Item */}
          <div className="form-group">
            <label htmlFor="itemName" className="form-label">
              Item
            </label>
            {category === "Other" ? (
              <input
                id="itemName"
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="form-input"
                required
              />
            ) : (
              <select
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="form-input"
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
          <div className="form-group">
            <label htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              className="form-input"
              required
            />
          </div>

          {/* Buttons */}
          <div className="modal-buttons">
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
