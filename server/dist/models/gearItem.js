"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GearItem = void 0;
exports.GearItemFactory = GearItemFactory;
const sequelize_1 = require("sequelize");
class GearItem extends sequelize_1.Model {
}
exports.GearItem = GearItem;
function GearItemFactory(sequelize) {
    GearItem.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        gearItem: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        claimedBy: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: true,
        },
        gearListId: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "GearItems",
        timestamps: true,
    });
    return GearItem;
}
//# sourceMappingURL=gearItem.js.map