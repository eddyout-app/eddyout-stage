"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = void 0;
exports.TripFactory = TripFactory;
const sequelize_1 = require("sequelize");
class Trip extends sequelize_1.Model {
}
exports.Trip = Trip;
function TripFactory(sequelize) {
    Trip.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        riverName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        startDate: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                isBeforeEndDate(value) {
                    if (new Date(value) >= new Date(this.endDate)) {
                        throw new Error("Start date must be before the end date");
                    }
                },
            },
        },
        endDate: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                isAfterStartDate(value) {
                    if (new Date(value) <= new Date(this.startDate)) {
                        throw new Error("End date must be after the start date");
                    }
                },
            },
        },
        putIn: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        takeOut: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        crewNum: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        organizerId: {
            type: sequelize_1.DataTypes.UUID, // ✅ match the type used in User
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    }, {
        sequelize,
        modelName: "Trip",
        tableName: "trips",
        timestamps: true,
    });
    return Trip;
}
