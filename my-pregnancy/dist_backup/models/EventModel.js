"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var Types;
(function (Types) {
    Types["Free"] = "Free";
    Types["Paid"] = "Paid";
})(Types || (Types = {}));
const schema = new mongoose_1.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    banner: { type: String, required: false },
    type: { type: String, enum: Object.values(Types), default: Types.Free },
    singlePrice: { type: String, required: false },
    doublePrice: { type: String, required: false },
    entryType: { type: String, required: false },
}, {
    timestamps: true,
});
const EventModel = (0, mongoose_1.model)('Events', schema);
exports.default = EventModel;
//# sourceMappingURL=EventModel.js.map