export type TripRole = {
  _id: string;
  tripId: string;
  name: string;
  description?: string;
};

export type CrewMember = {
  _id: string;
  tripId: string;
  userId: string;
  roleId: string;
  role?: TripRole;
  createdAt: string;
  updatedAt: string;
};
