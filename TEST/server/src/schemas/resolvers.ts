import { Meals } from "../models/meals";

const resolvers = {
  Query: {
    meals: async () => await Meals.findAll(),
  },
};

export default resolvers;