export type MealData = {
  _id: string;
  mealType: string;
  mealName?: string;
  tripId: string;
  date: string;
  userId?: {
    _id: string;
    fullName: string;
  } | null;
};
