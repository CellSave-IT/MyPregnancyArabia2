"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validationSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    location: joi_1.default.string().required(),
    date: joi_1.default.date().required(),
    startTime: joi_1.default.string().required(),
    endTime: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    image: joi_1.default.string().when('$method', {
        is: 'post',
        then: joi_1.default.string().required(),
        otherwise: joi_1.default.string().optional(),
    }),
    banner: joi_1.default.string().when('$method', {
        is: 'post',
        then: joi_1.default.string().required(),
        otherwise: joi_1.default.string().optional(),
    }),
    type: joi_1.default.string().required(),
    entryTypes: joi_1.default.array().items(joi_1.default.string()).min(1).required(),
    singlePrice: joi_1.default.string().optional(),
    doublePrice: joi_1.default.string().optional(),
});
exports.default = validationSchema;
//# sourceMappingURL=EventValidation.js.map