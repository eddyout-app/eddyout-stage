export type TripFormData = {
  riverName: string;
  startDate: string;
  endDate: string;
  putIn: string;
  takeOut: string;
  crewNum?: number;
};

export type TripData = {
  _id: string;
  email: string;
  riverName: string;
  startDate: Date;
  endDate: Date;
  putIn: string;
  takeOut: string;
  crewNum: number;
  organizerId: string;
  createdAt: string;
  updatedAt: string;
};
