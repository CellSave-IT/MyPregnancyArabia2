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
    phoneNo: joi_1.default.string().required(),
    date: joi_1.default.date().required(),
    deliveryHospital: joi_1.default.string().required(),
    countryCode: joi_1.default.string().required(),
});
exports.default = validationSchema;
//# sourceMappingURL=DownloadValidation.js.map