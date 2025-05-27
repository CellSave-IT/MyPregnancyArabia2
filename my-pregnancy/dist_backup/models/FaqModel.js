"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
}, {
    timestamps: true,
});
const FaqModel = (0, mongoose_1.model)('Faqs', schema);
exports.default = FaqModel;
//# sourceMappingURL=FaqModel.js.map