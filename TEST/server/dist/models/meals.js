"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meals = void 0;
exports.MealFactory = MealFactory;
const sequelize_1 = require("sequelize");
class Meals extends sequelize_1.Model {
    static findById(_id) {
        throw new Error('Method not implemented.');
    }
}
exports.Meals = Meals;
function MealFactory(sequelize) {
    Meals.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        tripId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
        },
        date: {
            type: sequelize_1.DataTypes.DATE, // Store date for meal
            allowNull: false,
        },
        mealType: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        mealName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        crewMember: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: "Meal",
        tableName: "meals",
        timestamps: true,
    });
    return Meals;
}
