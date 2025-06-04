import { TripData } from "../types/trip";

export default function transformTrip(trip: TripData): TripData {
  return {
    ...trip,
    startDate: new Date(trip.startDate),
    endDate: new Date(trip.endDate),
  };
}

export function toDateOnlyString(date: Date | string): string {
  return new Date(date).toISOString().split("T")[0];
}
