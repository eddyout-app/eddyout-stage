import { sequelize } from "../config/connection";
import { TripFactory } from "./trip.js";
import { MealFactory } from "./meals.js";
import { UserFactory } from "./user.js";
import { CrewFactory } from "./crew.js";
import { GearListFactory } from "./gearList.js";
import { GearItemFactory } from "./gearItem.js";
import { ScheduleFactory } from "./schedule.js";

const Trip = TripFactory(sequelize);
const Crew = CrewFactory(sequelize);
const Meal = MealFactory(sequelize);
const User = UserFactory(sequelize);
const GearList = GearListFactory(sequelize);
const GearItem = GearItemFactory(sequelize);
const Schedule = ScheduleFactory(sequelize);

// User - Trip
User.hasMany(Trip, { foreignKey: "organizerId", as: "organizedTrips" });
Trip.belongsTo(User, { foreignKey: "organizerId", as: "organizer" });

// Trip - Crew
Trip.hasMany(Crew, { foreignKey: "tripId", onDelete: "CASCADE", as: "crew" });
Crew.belongsTo(Trip, { foreignKey: "tripId" });

//Crew -User
Crew.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Crew, { foreignKey: "userId", as: "user" });

// Trip - Meal
Trip.hasMany(Meal, { foreignKey: "tripId", onDelete: "CASCADE", as: "meals" });
Meal.belongsTo(Trip, { foreignKey: "tripId" });

// User - Meal
User.hasMany(Meal, { foreignKey: "cookId", as: "cookedMeals" });
Meal.belongsTo(User, { foreignKey: "cookId", as: "cook" });

// Trip = GearList
Trip.hasOne(GearList, {
  foreignKey: "tripId",
  onDelete: "CASCADE",
  as: "gearList",
});
GearList.belongsTo(Trip, { foreignKey: "tripId" });

// Gear List - Gear Items
GearList.hasMany(GearItem, {
  foreignKey: "gearListId",
  onDelete: "CASCADE",
  as: "items",
});
GearItem.belongsTo(GearList, { foreignKey: "gearListId" });

// Trip - Gear Items
Trip.hasMany(GearItem, { foreignKey: "tripId", as: "tripGearItems" });
GearItem.belongsTo(Trip, { foreignKey: "tripId" });

// User - Gear Items
User.hasMany(GearItem, { foreignKey: "claimedById", as: "claimedGearItems" });
GearItem.belongsTo(User, { foreignKey: "claimedById", as: "claimer" });

// Trip - Schedule
Trip.hasOne(Schedule, {
  foreignKey: "tripId",
  onDelete: "CASCADE",
  as: "schedule",
});
Schedule.belongsTo(Trip, { foreignKey: "tripId" });

export { Trip, Crew, Meal, User, Schedule, GearItem, GearList };
