// src/testing/scenarios/MockMealTest.tsx

import { MockedProvider } from "@apollo/client/testing";
import MealSection from "../../components/meals/MealSection";
import { mockTrip, mealsQueryMock } from "../mocks/mealsMock";

// const mockCurrentUser = {
//   _id: "user1",
//   fullName: "Lisa J.",
//   email: "lisa@example.com",
// };

export default function MockMealTest() {
  return (
    <MockedProvider mocks={mealsQueryMock} addTypename={false}>
      <MealSection trip={mockTrip} />
    </MockedProvider>
  );
}
