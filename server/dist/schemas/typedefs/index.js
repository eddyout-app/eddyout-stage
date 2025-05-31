"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const tripTypeDefs_1 = __importDefault(require("./tripTypeDefs"));
// import other typedefs when ready
const baseTypeDefs = (0, apollo_server_express_1.gql) `
  type Query
  type Mutation
`;
exports.default = [
    baseTypeDefs,
    tripTypeDefs_1.default,
    // add others here as you build them
];
