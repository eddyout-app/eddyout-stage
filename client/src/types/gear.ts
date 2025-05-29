export type GearCatalogItem = {
  _id: string;
  itemName: string;
  category: string;
  isCustom?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type AssignedGearItem = {
  _id: string;
  tripId: string;
  userId: string;
  gearCatalogItemId: string; // 🔗 ties to GearCatalogItem._id
  quantity?: number;
  notes?: string;
  isPacked?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
