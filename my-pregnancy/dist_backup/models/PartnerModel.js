"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    link: { type: String, required: false },
    image: { type: String, required: true },
}, {
    timestamps: true,
});
const PartnerModel = (0, mongoose_1.model)('Partners', schema);
exports.default = PartnerModel;
//# sourceMappingURL=PartnerModel.js.map