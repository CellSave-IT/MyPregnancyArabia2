"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validationSchema = joi_1.default.object({
    fName: joi_1.default.string().required(),
    lName: joi_1.default.string().required(),
    nationality: joi_1.default.string().required(),
    isPregnant: joi_1.default.boolean().required(),
    previousAttend: joi_1.default.boolean().required(),
    dueDate: joi_1.default.date().required(),
    deliveryHospital: joi_1.default.string().required(),
    doctorName: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    phoneNo: joi_1.default.string().required(),
    event: joi_1.default.string().required(),
    entryType: joi_1.default.string().required(),
});
exports.default = validationSchema;
//# sourceMappingURL=RegistrationValidation.js.map