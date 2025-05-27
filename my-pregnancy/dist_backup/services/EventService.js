"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventModel_1 = __importDefault(require("../models/EventModel"));
const removeFile_1 = __importDefault(require("../utils/removeFile"));
const mongoose_1 = require("mongoose");
const query = EventModel_1.default;
exports.default = {
    get: async (params) => {
        let filter = {};
        filter = params.type === 'Upcoming' ? { date: { $gte: new Date() } } : params.type === 'Past' ? { date: { $lte: new Date() } } : {};
        if (!!params?.id) {
            if (!(0, mongoose_1.isValidObjectId)(params?.id)) {
                throw new Error('Invalid Id');
            }
            filter = { ...filter, _id: { $ne: new mongoose_1.Types.ObjectId(params.id) } };
        }
        const items = await query
            .find(filter)
            .sort({ date: -1 })
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
        let entryType = null;
        if (data?.entryTypes.includes('single') && data.entryTypes.includes('double')) {
            entryType = 'both';
        }
        else if (data.entryTypes.includes('single')) {
            entryType = 'single';
        }
        else {
            entryType = 'double';
        }
        const responseData = await query.create({
            title: data.title,
            date: data.date,
            startTime: data.startTime,
            endTime: data.endTime,
            location: data.location,
            description: data.description,
            image: data.image,
            banner: data?.banner,
            type: data.type,
            singlePrice: data.singlePrice || null,
            doublePrice: data.doublePrice || null,
            entryType: entryType,
        });
        return responseData;
    },
    update: async (data, id) => {
        let { entryTypes, ...filterData } = data;
        let entryType = null;
        if (data?.entryTypes.includes('single') && data.entryTypes.includes('double')) {
            entryType = 'both';
        }
        else if (data.entryTypes.includes('single')) {
            entryType = 'single';
        }
        else {
            entryType = 'double';
        }
        const responseData = await query.findByIdAndUpdate(id, {
            $set: {
                ...filterData,
                entryType: entryType,
            },
        }, { new: true });
        if (!responseData) {
            throw new Error('Invalid Id');
        }
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
    delete: async (id) => {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new Error('Invalid Id');
        }
        const responseData = await query.findByIdAndDelete(id);
        if (!!responseData?.image) {
            (0, removeFile_1.default)(responseData.image);
        }
        if (!!responseData?.banner) {
            (0, removeFile_1.default)(responseData.banner);
        }
        if (!responseData) {
            throw new Error('Invalid Id');
        }
        return responseData;
    },
};
//# sourceMappingURL=EventService.js.map