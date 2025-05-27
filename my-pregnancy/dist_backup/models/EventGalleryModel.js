"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    image: { type: String, required: true },
    eventId: { type: mongoose_1.Types.ObjectId, ref: 'Events', required: true },
}, {
    timestamps: true,
});
const EventModel = (0, mongoose_1.model)('EventGalleries', schema);
exports.default = EventModel;
//# sourceMappingURL=EventGalleryModel.js.map