export type CampsiteData = {
  _id: string;
  tripId: string;
  userId: string;
  name: string;
  description?: string | null;
  location: {
    latitude: number;
    longitude: number;
  };
  weather?: {
    temperature?: number | null;
    conditions?: string | null;
    windSpeed?: number | null;
    humidity?: number | null;
    precipitation?: number | null;
  };
  startDate: Date;
  endDate: Date;
  createdAt?: string | null;
  updatedAt?: string | null;
};
