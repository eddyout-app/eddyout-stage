export interface MealData {
  id: number | null;
  mealType: string;
  mealName: string;
  description?: string | null;
  crewMember: string;
  tripId: string;
}
