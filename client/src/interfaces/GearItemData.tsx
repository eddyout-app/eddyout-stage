import { UserData } from "./UserData";
import { TripData } from "./TripData";

export interface GearItem {
  id: number | null;
  gearItem: string | null;
  tripId: TripData | null;
  quantity: number | null;
  claimedBy?: {
    id: number | null;
    name: UserData | null;
  }
}
