"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    email: { type: String, required: true },
    nationality: { type: String, required: true },
    isPregnant: { type: Boolean, required: true },
    dueDate: { type: Date, required: true },
    deliveryHospital: { type: String, required: true },
    doctorName: { type: String, required: true },
    previousAttend: { type: Boolean, required: true },
    phoneNo: { type: String, required: true },
    event: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Events' },
    payment: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Payments', required: false },
    description: { type: String, required: true },
    entryType: { type: String, required: true },
}, {
    timestamps: true,
});
const RegistrationModel = (0, mongoose_1.model)('Registrations', schema);
exports.default = RegistrationModel;
//# sourceMappingURL=RegistrationModel.js.map