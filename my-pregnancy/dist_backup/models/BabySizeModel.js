"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    week: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
}, {
    timestamps: true,
});
const BabySizeModel = (0, mongoose_1.model)('BabySizes', schema);
exports.default = BabySizeModel;
//# sourceMappingURL=BabySizeModel.js.map