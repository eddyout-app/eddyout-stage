export type GearCatalogItemData = {
  _id: string;
  itemName: string;
  category: string;
  perPersonQty: number;
  unit?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type GearItemData = {
  _id: string;
  gearItem: string;
  quantity: number;
  category: string;
  userId: string | null;
  tripId: string;
  createdAt: string;
  updatedAt: string;
};
