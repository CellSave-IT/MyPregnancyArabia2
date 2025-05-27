"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validationSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    image: joi_1.default.string().when('$method', {
        is: 'post',
        then: joi_1.default.string().required(),
        otherwise: joi_1.default.string().optional(),
    }),
    tag: joi_1.default.string().required(),
});
exports.default = validationSchema;
//# sourceMappingURL=DiaryValidation.js.map