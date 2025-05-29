export interface ScheduleItem {
  id: string;
  tripId: string;
  day: number;
  campsite: string;
  date: string;
}

export async function fetchScheduleForTrip(
  tripId: string
): Promise<ScheduleItem[]> {
  const token = localStorage.getItem("id_token");
  if (!token) {
    throw new Error("No token found in local storage");
  }

  if (!tripId) {
    throw new Error("No tripId provided to fetchScheduleForTrip");
  }

  const url = `/api/schedule/${tripId}`;
  console.log("Fetching from URL:", url); //

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch schedule");
  }
  return res.json();
}

export async function createScheduleItem(data: {
  campsite: string;
  tripId: string;
  date: string;
}) {
  const token = localStorage.getItem("id_token");

  const res = await fetch("/api/schedule", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create schedule item");

  return res.json();
}

export async function updateScheduleItem(
  id: string,
  data: { campsite: string }
) {
  const token = localStorage.getItem("id_token");

  const res = await fetch(`/api/schedule/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update schedule item");

  return res.json();
}
