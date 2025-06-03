"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize_1 = require("sequelize");
const sequelize = process.env.DB_URL
    ? new sequelize_1.Sequelize(process.env.DB_URL)
    : new sequelize_1.Sequelize(process.env.DB_NAME || "", process.env.DB_USER || "", process.env.DB_PASSWORD, {
        host: process.env.DB_HOST || "127.0.0.1",
        port: Number(process.env.DB_PORT) || 5432,
        dialect: "postgres",
        dialectOptions: {
            decimalNumbers: true,
        },
    });
exports.sequelize = sequelize;
//# sourceMappingURL=connection.js.map