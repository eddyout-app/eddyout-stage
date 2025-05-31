export type TripFormData = {
  id?: string;
  email: string;
  riverName: string;
  startDate: string;
  endDate: string;
  putIn: string;
  takeOut: string;
  numOfParticipants: string;
  organizerId?: string;
  createdAt: string;
  updatedAt: string;
};

export type TripData = {
  _id: string;
  email: string;
  riverName: string;
  startDate: Date;
  endDate: Date;
  putIn: string;
  takeOut: string;
  numOfParticipants: number;
  organizerId: string;
  createdAt: string;
  updatedAt: string;
};
