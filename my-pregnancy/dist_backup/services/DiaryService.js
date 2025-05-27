"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DiaryModel_1 = __importDefault(require("../models/DiaryModel"));
const removeFile_1 = __importDefault(require("../utils/removeFile"));
const mongoose_1 = require("mongoose");
const query = DiaryModel_1.default;
exports.default = {
    get: async (params) => {
        let filter = {};
        if (params?.id) {
            if (!(0, mongoose_1.isValidObjectId)(params?.id)) {
                throw new Error('Invalid Id');
            }
            filter = { ...filter, _id: { $ne: new mongoose_1.Types.ObjectId(params.id) } };
        }
        const items = await query
            .find(filter)
            .sort(params.orderBy === 'count' ? { count: -1 } : { createdAt: -1 })
            .limit(params.pageSize)
            .skip((params.page - 1) * params.pageSize)
            .exec();
        const count = await query.countDocuments(filter);
        return {
            items,
            totalPages: Math.ceil(count / params.pageSize),
            currentPage: params.page,
        };
    },
    store: async (data) => {
        const responseData = await query.create({
            title: data.title,
            description: data.description,
            image: data.image,
            tag: data.tag,
        });
        return responseData;
    },
    getById: async (id) => {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new Error('Invalid Id');
        }
        const data = await query.findById(id);
        if (!!data) {
            return data;
        }
        else {
            throw new Error('Invalid Id');
        }
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
    updateCount: async (id) => {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new Error('Invalid Id');
        }
        const find = await query.findById(id);
        if (!!find?._id) {
            const updatedCount = parseInt(find.count || 0) + 1;
            const responseData = await query.findByIdAndUpdate(id, { $set: { count: updatedCount } }, { new: true });
            return responseData;
        }
        else {
            throw new Error('Invalid Id');
        }
    },
};
//# sourceMappingURL=DiaryService.js.map