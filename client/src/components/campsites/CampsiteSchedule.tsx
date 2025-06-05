interface CampsiteScheduleProps {
  date: Date;
  location: string;
  latitude: number;
  longitude: number;
  weather?: {
    temperature?: number | null;
    conditions?: string | null;
    windSpeed?: number | null;
    humidity?: number | null;
    precipitation?: number | null;
  };
  onLocationChange?: (value: string) => void;
  onSave?: () => void;
  isSaved?: boolean;
}

export default function CampsiteSchedule({
  date,
  location,
  latitude,
  longitude,
  weather,
}: // onLocationChange,
// onSave,
// isSaved = false,
CampsiteScheduleProps) {
  // Same basic UI you already had — now using these props
  // You can add display of lat/lon and weather here if you want!
  return (
    <div className="schedule-day-container">
      <h3 className="schedule-day-title">
        {date.toLocaleDateString()} - {location || "Unnamed Campsite"}
      </h3>
      <p>
        Location: {latitude}, {longitude}
      </p>
      {weather && (
        <p>
          Weather: {weather.conditions || "Unknown"} | Temp:{" "}
          {weather.temperature ?? "--"}°F
        </p>
      )}

      {/* Your edit/save UI here */}
    </div>
  );
}
