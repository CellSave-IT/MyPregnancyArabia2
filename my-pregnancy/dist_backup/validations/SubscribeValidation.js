"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validationSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
});
exports.default = validationSchema;
//# sourceMappingURL=SubscribeValidation.js.map