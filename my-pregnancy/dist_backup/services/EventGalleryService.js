"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventGalleryModel_1 = __importDefault(require("../models/EventGalleryModel"));
const removeFile_1 = __importDefault(require("../utils/removeFile"));
const mongoose_1 = require("mongoose");
const query = EventGalleryModel_1.default;
exports.default = {
    get: async (id, params) => {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new Error('Invalid Id');
        }
        const items = await query
            .find({
            eventId: new mongoose_1.Types.ObjectId(id),
        })
            .sort({ createdAt: -1 })
            .limit(params.pageSize)
            .skip((params.page - 1) * params.pageSize)
            .exec();
        const count = await query.countDocuments({
            eventId: new mongoose_1.Types.ObjectId(id),
        });
        return {
            items,
            totalPages: Math.ceil(count / params.pageSize),
            currentPage: params.page,
        };
    },
    store: async (data, id) => {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new Error('Invalid Id');
        }
        const formatData = data?.images?.map((image) => {
            return {
                image: image,
                eventId: new mongoose_1.Types.ObjectId(id),
            };
        });
        const responseData = await query.insertMany(formatData);
        return responseData;
    },
    delete: async (id) => {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new Error('Invalid Id');
        }
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
//# sourceMappingURL=EventGalleryService.js.map