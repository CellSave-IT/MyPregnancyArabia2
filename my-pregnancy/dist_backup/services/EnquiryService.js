"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EnquiryModel_1 = __importDefault(require("../models/EnquiryModel"));
const query = EnquiryModel_1.default;
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
        const responseData = await query.create({
            fName: data.fName,
            lName: data.lName,
            email: data.email,
            message: data.message,
            countryCode: data?.countryCode || null,
            phoneNo: data?.phoneNo || null,
        });
        return responseData;
    },
};
//# sourceMappingURL=EnquiryService.js.map