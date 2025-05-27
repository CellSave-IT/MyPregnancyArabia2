"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    email: { type: String, required: true },
    countryCode: { type: String, required: false },
    phoneNo: { type: String, required: false },
    message: { type: String, required: false },
}, {
    timestamps: true,
});
const EnquiryModel = (0, mongoose_1.model)('Enquiry', schema);
exports.default = EnquiryModel;
//# sourceMappingURL=EnquiryModel.js.map