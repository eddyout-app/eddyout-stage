"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crew = void 0;
exports.CrewFactory = CrewFactory;
const sequelize_1 = require("sequelize");
class Crew extends sequelize_1.Model {
}
exports.Crew = Crew;
function CrewFactory(sequelize) {
    Crew.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        tripId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: "trips",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        userId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
    }, {
        tableName: "crew",
        sequelize,
    });
    return Crew;
}
//# sourceMappingURL=crew.js.map