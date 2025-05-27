"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validationSchema = joi_1.default.object({
    week: joi_1.default.number().required(),
    description: joi_1.default.string().required(),
    image: joi_1.default.string().when('$method', {
        is: 'post',
        then: joi_1.default.string().required(),
        otherwise: joi_1.default.string().optional(),
    }),
});
exports.default = validationSchema;
//# sourceMappingURL=BabySizeValidation.js.map