"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
}, {
    timestamps: true,
});
const SubscribeModel = (0, mongoose_1.model)('Subscribes', schema);
exports.default = SubscribeModel;
//# sourceMappingURL=SubscribeModel.js.map