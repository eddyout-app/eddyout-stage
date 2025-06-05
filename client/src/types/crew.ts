export type CrewMember = {
  _id: string;
  tripId: string;
  userId: {
    _id: string;
    fullName: string;
  };
  role?: string;
  createdAt?: string;
  updatedAt?: string;
};
