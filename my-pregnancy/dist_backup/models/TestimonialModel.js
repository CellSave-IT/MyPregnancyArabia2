"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
}, {
    timestamps: true,
});
const TestimonialModel = (0, mongoose_1.model)('Testimonials', schema);
exports.default = TestimonialModel;
//# sourceMappingURL=TestimonialModel.js.map