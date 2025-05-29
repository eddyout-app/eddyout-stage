export type MealData = {
  _id: number | null;
  tripId: string;
  userId: string;
  mealType: string;
  mealName: string;
  description?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};
