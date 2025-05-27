"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tag: { type: String, required: true },
    count: { type: Number, required: false, defaultValue: 0 },
}, {
    timestamps: true,
});
const DiaryModel = (0, mongoose_1.model)('Diaries', schema);
exports.default = DiaryModel;
//# sourceMappingURL=DiaryModel.js.map