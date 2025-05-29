"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedule = void 0;
exports.ScheduleFactory = ScheduleFactory;
const sequelize_1 = require("sequelize");
class Schedule extends sequelize_1.Model {
}
exports.Schedule = Schedule;
function ScheduleFactory(sequelize) {
    Schedule.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        campsite: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        tripId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: "trips",
                key: "id",
            },
        },
    }, {
        tableName: "schedule",
        sequelize,
    });
    return Schedule;
}
