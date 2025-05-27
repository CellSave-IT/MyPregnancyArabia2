"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validationSchema = joi_1.default.object({
    fName: joi_1.default.string().required(),
    lName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    message: joi_1.default.string().allow(null, ''),
    phoneNo: joi_1.default.string().allow(null, ''),
    countryCode: joi_1.default.string().allow(null, ''),
});
exports.default = validationSchema;
//# sourceMappingURL=EnquiryValidation.js.map