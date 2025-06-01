import { GearItem } from "./GearItemData";

export interface GearList {
  tripId: number | null;
  gearItem: GearItem[];
}
