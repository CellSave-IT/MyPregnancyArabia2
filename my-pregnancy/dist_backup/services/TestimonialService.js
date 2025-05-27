"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TestimonialModel_1 = __importDefault(require("../models/TestimonialModel"));
const removeFile_1 = __importDefault(require("../utils/removeFile"));
const query = TestimonialModel_1.default;
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
            name: data.name,
            description: data.description,
            image: data.image,
        });
        return responseData;
    },
    update: async (data, id) => {
        if (!!data.image) {
            const find = await query.findById(id);
            if (!!find?.image) {
                (0, removeFile_1.default)(find.image);
            }
        }
        const responseData = await query.findByIdAndUpdate(id, { $set: data }, { new: true });
        if (!responseData) {
            throw new Error('Invalid Id');
        }
        return responseData;
    },
    delete: async (id) => {
        const responseData = await query.findByIdAndDelete(id);
        if (!!responseData?.image) {
            (0, removeFile_1.default)(responseData.image);
        }
        if (!responseData) {
            throw new Error('Invalid Id');
        }
        return responseData;
    },
};
//# sourceMappingURL=TestimonialService.js.map