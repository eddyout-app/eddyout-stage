export interface TripFormData {
  id?: string;
  email: string;
  riverName: string;
  startDate: string;
  endDate: string;
  putIn: string;
  takeOut: string;
  crewNum: string;
  organizerId?: string;
}

export interface TripData {
  id: string;
  email: string;
  riverName: string;
  startDate: Date;
  endDate: Date;
  putIn: string;
  takeOut: string;
  crewNum: number;
}
