"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SubscribeModel_1 = __importDefault(require("../models/SubscribeModel"));
const query = SubscribeModel_1.default;
exports.default = {
    get: async (params) => {
        const items = await query
            .find()
            .sort({ createdAt: -1 })
            .limit(params.pageSize)
            .skip((params.page - 1) * params.pageSize)
            .exec();
        const count = await query.countDocuments();
        return {
            items,
            totalPages: Math.ceil(count / params.pageSize),
            currentPage: params.page,
        };
    },
    store: async (data) => {
        const find = await query.findOne({ email: data.email }).exec();
        if (find?._id) {
            throw new Error('You have already subscribe');
        }
        const responseData = await query.create({
            email: data.email,
        });
        return responseData;
    },
};
//# sourceMappingURL=SubscribeService.js.map