"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: false },
    image: { type: String, required: false },
}, {
    timestamps: true,
});
const CommunityCategoryModel = (0, mongoose_1.model)('CommunityCategories', schema);
exports.default = CommunityCategoryModel;
//# sourceMappingURL=CommunityCategoryModel.js.map