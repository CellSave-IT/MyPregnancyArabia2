"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    group: { type: String, required: false },
    key: { type: String, required: false, unique: true },
    value: { type: String, required: false },
    title: { type: String, required: false },
    image: { type: String, required: false },
}, {
    timestamps: true,
});
const GeneralSettingModel = (0, mongoose_1.model)('GeneralSettings', schema);
exports.default = GeneralSettingModel;
//# sourceMappingURL=GeneralSetting.js.map