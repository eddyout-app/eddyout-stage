import React from "react";
import { GearItem as GearItemInterface } from "../interfaces/GearItemData";

interface GearItemProps {
  item: GearItemInterface;
  userId: number;
  onClaimToggle: (itemId: number) => void;
}

const GearItem: React.FC<GearItemProps> = ({ item, userId, onClaimToggle }) => {
  const isClaimed = !!item.claimedBy;
  const claimedByYou = item.claimedBy?.id === userId;

  return (
    <li className="flex justify-between items-center border p-2 rounded">
      <div>
        <p className="font-medium">{item.gearItem}</p>
        <p>Quantity: {item.quantity}</p>
        {isClaimed && (
          <p className="text-sm text-gray-600">
            Claimed by {claimedByYou ? "you" : String(item.claimedBy?.name) || "Open"}
          </p>
        )}
      </div>
      <button
        onClick={() => item.id !== null && onClaimToggle(item.id)}
        className={`px-3 py-1 text-sm rounded ${
          claimedByYou
            ? "bg-red-100 hover:bg-red-200"
            : "bg-green-100 hover:bg-green-200"
        }`}
      >
        {claimedByYou ? "Unclaim" : "Claim"}
      </button>
    </li>
  );
};

export default GearItem;