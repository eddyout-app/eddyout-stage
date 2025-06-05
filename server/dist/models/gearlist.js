"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GearList = void 0;
exports.GearListFactory = GearListFactory;
const sequelize_1 = require("sequelize");
class GearList extends sequelize_1.Model {
}
exports.GearList = GearList;
function GearListFactory(sequelize) {
    GearList.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        gearList: {
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
        sequelize,
        tableName: "GearLists",
        timestamps: true,
    });
    return GearList;
}
//# sourceMappingURL=gearList.js.map