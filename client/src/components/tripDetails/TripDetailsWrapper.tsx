// src/components/tripDetails/TripDetailsWrapper.tsx
import { useParams } from "react-router-dom";
import TripDetailPanel from "./TripDetailPanel";

export default function TripDetailsWrapper() {
  const { tripId } = useParams<{ tripId: string }>();

  // You can optionally add logic to get view from URL or default:
  const view = "summary";

  return (
    <TripDetailPanel
      tripId={tripId || ""}
      view={view}
      onClose={() => {
        // Optional: navigate back or noop
        console.log("Close clicked");
      }}
    />
  );
}
