// src/testing/mocks/mealsMock.ts

import { GET_MEALS_BY_TRIP } from "../../graphql/meals/queries";

export const mockTrip = {
  _id: "trip123",
  startDate: new Date("2025-07-01"),
  endDate: new Date("2025-07-05"),
  email: "mock@email.com",
  riverName: "Colorado River",
  putIn: "Apache Canyon",
  takeOut: "Rio Grande",
  numOfParticipants: 5,
  organizerId: "Tippy McBoatface",
  createdAt: "2025-06-01T12:00:00.000Z",
  updatedAt: "2025-06-10T08:30:00.000Z",
};

export const mockMeals = [
  // Day 1
  {
    _id: "meal1",
    mealType: "Breakfast",
    mealName: "Bagels and cream cheese",
    tripId: "trip123",
    date: "2025-07-01T00:00:00.000Z",
    userId: { _id: "user1", fullName: "Lisa J." },
  },

  {
    _id: "meal3",
    mealType: "Dinner",
    mealName: "Campfire chili",
    tripId: "trip123",
    date: "2025-07-01T00:00:00.000Z",
    userId: { _id: "user2", fullName: "Jamie B." },
  },

  {
    _id: "meal5",
    mealType: "Lunch",
    mealName: "PB&J sandwiches",
    tripId: "trip123",
    date: "2025-07-02T00:00:00.000Z",
    userId: { _id: "user3", fullName: "Alex R." },
  },
];

export const mealsQueryMock = [
  {
    request: {
      query: GET_MEALS_BY_TRIP,
      variables: { tripId: "trip123" },
    },
    result: {
      data: {
        mealsByTrip: mockMeals,
      },
    },
  },
];
