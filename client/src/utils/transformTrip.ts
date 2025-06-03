import { TripFormData, TripData } from "../types/trip";

export default function transformTrip(formData: TripFormData): TripData {
  if (!formData.id) {
    throw new Error("TripFormData is missing a valid id.");
  }

  const parsedCrewNum = Number(formData.numOfParticipants);
  if (isNaN(parsedCrewNum) || parsedCrewNum < 1) {
    throw new Error("Invalid crew number.");
  }

  return {
    _id: formData.id,
    email: formData.email,
    riverName: formData.riverName,
    startDate: new Date(formData.startDate),
    endDate: new Date(formData.endDate),
    putIn: formData.putIn,
    takeOut: formData.takeOut,
    numOfParticipants: parsedCrewNum,
    organizerId: formData.organizerId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function toDateOnlyString(date: Date | string): string {
  return new Date(date).toISOString().split("T")[0];
}
