"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    date: { type: Date, required: true },
    email: { type: String, required: true },
    phoneNo: { type: String, required: true },
    deliveryHospital: { type: String, required: true },
    countryCode: { type: String, required: false },
}, {
    timestamps: true,
});
const DownloadModel = (0, mongoose_1.model)('Downloads', schema);
exports.default = DownloadModel;
//# sourceMappingURL=DownloadModel.js.map