export interface CrewData {
  id: string ;
  tripId: string;
  userId: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
  }
}