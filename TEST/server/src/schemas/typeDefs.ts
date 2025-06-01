const typeDefs = `
  # Define which fields are accessible from the Class model
  type Meals {
    id: string
    tripId: String
    date: String
    mealType: string
    mealName: string
    description: string
    crewMember: string

  }

  # Define which queries the front end is allowed to make and what data is returned
  type Query {
    classes: [Class]
  }
`;

export default typeDefs;