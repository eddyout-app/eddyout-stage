"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
const tripTypeDefs_1 = __importDefault(require("./tripTypeDefs"));
const expenseTypeDefs_1 = require("./expenseTypeDefs");
// import other typedefs when ready
const baseTypeDefs = (0, graphql_tag_1.gql) `
  type Query
  type Mutation
`;
exports.default = [
    baseTypeDefs,
    tripTypeDefs_1.default,
    expenseTypeDefs_1.expenseTypeDefs,
    // add others here as you build them
];
