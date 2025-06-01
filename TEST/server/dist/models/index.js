"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GearList = exports.GearItem = exports.Schedule = exports.User = exports.Meal = exports.Crew = exports.Trip = void 0;
const connection_1 = require("../config/connection");
const trip_js_1 = require("./trip.js");
const meals_js_1 = require("./meals.js");
const user_js_1 = require("./user.js");
const crew_js_1 = require("./crew.js");
const gearList_js_1 = require("./gearList.js");
const gearItem_js_1 = require("./gearItem.js");
const schedule_js_1 = require("./schedule.js");
const Trip = (0, trip_js_1.TripFactory)(connection_1.sequelize);
exports.Trip = Trip;
const Crew = (0, crew_js_1.CrewFactory)(connection_1.sequelize);
exports.Crew = Crew;
const Meal = (0, meals_js_1.MealFactory)(connection_1.sequelize);
exports.Meal = Meal;
const User = (0, user_js_1.UserFactory)(connection_1.sequelize);
exports.User = User;
const GearList = (0, gearList_js_1.GearListFactory)(connection_1.sequelize);
exports.GearList = GearList;
const GearItem = (0, gearItem_js_1.GearItemFactory)(connection_1.sequelize);
exports.GearItem = GearItem;
const Schedule = (0, schedule_js_1.ScheduleFactory)(connection_1.sequelize);
exports.Schedule = Schedule;
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
