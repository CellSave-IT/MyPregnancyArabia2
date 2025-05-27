"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PartnerModel_1 = __importDefault(require("../models/PartnerModel"));
const removeFile_1 = __importDefault(require("../utils/removeFile"));
const query = PartnerModel_1.default;
exports.default = {
    get: async () => {
        return query.find().sort({ createdAt: -1 });
    },
    store: async (data) => {
        const responseData = await query.create({
            image: data.image,
            link: data.link || null,
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
//# sourceMappingURL=PartnerService.js.map