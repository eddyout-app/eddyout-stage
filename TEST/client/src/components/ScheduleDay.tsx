import React from "react";
import { useState, useEffect } from "react";

interface ScheduleDayProps {
  date: Date;
  index: number;
  endDate: Date;
  location: string;
  onLocationChange?: (value: string) => void;
  onSave?: () => void;
  isSaved?: boolean;
}

const ScheduleDay: React.FC<ScheduleDayProps> = ({
  date,
  location,
  index,
  endDate,
  onLocationChange,
  onSave,
  isSaved = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(!isSaved);
  }, [isSaved]);

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = () => {
    onSave?.();
    setIsEditing(false);
  };

  return (
    <div className="schedule-day-container">
      <h2 className="schedule-day-title">
        {date.getTime() === endDate.getTime() ? "Last Day" : `Day ${index}`}
      </h2>
      <h2 className="schedule-day-date">{date.toLocaleDateString()}</h2>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 w-full">
        <label className="font-semibold self-start sm:self-center">
          Campsite:
        </label>
        {isEditing && onLocationChange ? (
          <>
            <input
              type="text"
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={handleSaveClick} className="btn-dark">
              Save
            </button>
          </>
        ) : (
          <>
            <span
              className="w-full sm:w-auto border border-transparent rounded-md px-3 py-2 text-gray-900"
              style={{ minHeight: "40px", display: "inline-block" }}
            >
              {location || "—"}
            </span>
            <button onClick={handleEditClick} className="btn-dark">
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ScheduleDay;
