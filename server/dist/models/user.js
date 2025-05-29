"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
exports.UserFactory = UserFactory;
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
class User extends sequelize_1.Model {
    // Hash the password before saving the user
    async setPassword(password) {
        const saltRounds = 10;
        this.password = await bcrypt_1.default.hash(password, saltRounds);
    }
    // Password validation during login
    async validatePassword(password) {
        return bcrypt_1.default.compare(password, this.password);
    }
}
exports.User = User;
function UserFactory(sequelize) {
    User.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: "users",
        sequelize,
        defaultScope: {
            attributes: { exclude: ["password"] },
        },
        hooks: {
            beforeCreate: async (user) => {
                await user.setPassword(user.password);
            },
            beforeUpdate: async (user) => {
                //prevents double hashing
                if (user.changed("password")) {
                    await user.setPassword(user.password);
                }
            },
        },
    });
    return User;
}
