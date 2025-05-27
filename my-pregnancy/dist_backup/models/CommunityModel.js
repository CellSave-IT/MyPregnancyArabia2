"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    categoryId: { type: mongoose_1.Types.ObjectId, ref: 'CommunityCategories', required: true },
}, {
    timestamps: true,
});
const CommunityModel = (0, mongoose_1.model)('Communities', schema);
exports.default = CommunityModel;
//# sourceMappingURL=CommunityModel.js.map