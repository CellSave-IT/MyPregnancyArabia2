"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    image: { type: String, required: true },
    galleryId: { type: mongoose_1.Types.ObjectId, ref: 'Galleries', required: true },
}, {
    timestamps: true,
});
const GalleryItemModel = (0, mongoose_1.model)('GalleryItem', schema);
exports.default = GalleryItemModel;
//# sourceMappingURL=GalleryItemModel.js.map