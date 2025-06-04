"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_js_1 = require("../../controllers/userController.js");
const router = express_1.default.Router();
exports.userRouter = router;
router.get('/', userController_js_1.getUsers);
router.get('/:id', userController_js_1.getUser);
router.post('/', userController_js_1.createUser);
