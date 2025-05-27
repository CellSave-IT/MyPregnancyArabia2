"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
}, {
    timestamps: true,
});
schema.virtual('images', {
    ref: 'GalleryItem',
    localField: '_id',
    foreignField: 'galleryId',
});
schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });
const GalleryModel = (0, mongoose_1.model)('Galleries', schema);
exports.default = GalleryModel;
//# sourceMappingURL=GalleryModel.js.map