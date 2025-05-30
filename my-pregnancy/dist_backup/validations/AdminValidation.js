"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidationSchema = exports.loginValidationSchema = exports.registerValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const registerValidationSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
exports.registerValidationSchema = registerValidationSchema;
const loginValidationSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.loginValidationSchema = loginValidationSchema;
const updateValidationSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
});
exports.updateValidationSchema = updateValidationSchema;
//# sourceMappingURL=AdminValidation.js.map