"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FaqModel_1 = __importDefault(require("../models/FaqModel"));
const query = FaqModel_1.default;
exports.default = {
    get: async () => {
        return await query.find().sort({ createdAt: -1 });
    },
    store: async (data) => {
        const responseData = await query.create({
            title: data.title,
            description: data.description,
        });
        return responseData;
    },
    update: async (data, id) => {
        const responseData = await query.findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
            },
        }, { new: true });
        if (!responseData) {
            throw new Error('Invalid Id');
        }
        return responseData;
    },
    delete: async (id) => {
        const responseData = await query.findByIdAndDelete(id);
        if (!responseData) {
            throw new Error('Invalid Id');
        }
        return responseData;
    },
};
//# sourceMappingURL=FaqService.js.map