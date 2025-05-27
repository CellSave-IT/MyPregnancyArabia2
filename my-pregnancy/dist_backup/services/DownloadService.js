"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DownloadModel_1 = __importDefault(require("../models/DownloadModel"));
const query = DownloadModel_1.default;
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
        const responseData = await query.create(data);
        return responseData;
    },
};
//# sourceMappingURL=DownloadService.js.map