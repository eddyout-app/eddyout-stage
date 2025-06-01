import { TripFormData } from "../interfaces/TripData";

export async function getTrips() {
  const token = localStorage.getItem("id_token");

  const res = await fetch("/api/trips", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Could not fetch trips");
  }

  return res.json();
}

export async function createTrip(tripData: TripFormData) {
  const token = localStorage.getItem("id_token");

  const res = await fetch("/api/trips", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tripData),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Could not create trip");
  }

  return res.json();
}
