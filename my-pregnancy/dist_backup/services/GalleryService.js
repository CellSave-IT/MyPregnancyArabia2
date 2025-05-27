"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GalleryModel_1 = __importDefault(require("../models/GalleryModel"));
const GalleryItemModel_1 = __importDefault(require("../models/GalleryItemModel"));
const mongoose_1 = require("mongoose");
const removeFile_1 = __importDefault(require("../utils/removeFile"));
const query = GalleryModel_1.default;
exports.default = {
    get: async (params) => {
        const items = await query
            .find()
            .populate('images')
            .sort({ createdAt: 1 })
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
            title: data.title,
            description: data.description,
        });
        if (data?.images?.length) {
            const images = data?.images?.map((image) => {
                return {
                    image: image,
                    galleryId: responseData._id,
                };
            });
            await GalleryItemModel_1.default.insertMany(images);
        }
        return responseData;
    },
    update: async (data, id) => {
        const responseData = await query.findByIdAndUpdate(id, { $set: data }, { new: true });
        if (data?.images?.length) {
            const images = data?.images?.map((image) => {
                return {
                    image: image,
                    galleryId: id,
                };
            });
            await GalleryItemModel_1.default.insertMany(images);
        }
        if (!responseData) {
            throw new Error('Invalid Id');
        }
        return responseData;
    },
    getById: async (id) => {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new Error('Invalid Id');
        }
        const data = await query.findById(id).populate('images').exec();
        if (!!data) {
            return data;
        }
        else {
            throw new Error('Invalid Id');
        }
    },
    delete: async (id) => {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new Error('Invalid Id');
        }
        const responseData = await query.findByIdAndDelete(id);
        if (!responseData) {
            throw new Error('Invalid Id');
        }
        return responseData;
    },
    deleteImage: async (id) => {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new Error('Invalid Id');
        }
        const responseData = await GalleryItemModel_1.default.findByIdAndDelete(id);
        if (!!responseData?.image) {
            (0, removeFile_1.default)(responseData.image);
        }
        if (!responseData) {
            throw new Error('Invalid Id');
        }
        return responseData;
    },
};
//# sourceMappingURL=GalleryService.js.map