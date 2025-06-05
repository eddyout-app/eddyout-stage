// src/types/gear.ts

export type GearItem = {
  _id: string;
  gearItem: string;
  quantity: number;
  category: string;
  claimedBy?: string | null;
  tripId: string;
  gearListId: string;
  createdAt?: string;
  updatedAt?: string;
};
