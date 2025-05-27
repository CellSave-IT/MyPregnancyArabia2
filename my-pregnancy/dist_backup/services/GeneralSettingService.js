"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralSetting_1 = __importDefault(require("../models/GeneralSetting"));
const removeFile_1 = __importDefault(require("../utils/removeFile"));
const query = GeneralSetting_1.default;
exports.default = {
    getByGroup: async (group) => {
        return await query.find({ group: group }).exec();
    },
    getByKey: async (key) => {
        return await query.findOne({ key: key }).exec();
    },
    createOrUpdate: async (data) => {
        if (Array.isArray(data)) {
            const responseData = data?.map(async (item) => {
                if (!!item?.image) {
                    const find = await query.findOne({ key: item?.key }).exec();
                    if (!!find && find?.image) {
                        (0, removeFile_1.default)(find.image);
                    }
                }
                return await query
                    .findOneAndUpdate({ key: item.key }, {
                    $set: item,
                }, {
                    new: true,
                    upsert: true,
                })
                    .exec();
            });
            return await Promise.all(responseData);
        }
        else {
            if (!!data.image) {
                const find = await query.findOne({ key: data?.key }).exec();
                if (!!find && find?.image) {
                    (0, removeFile_1.default)(find.image);
                }
            }
            const responseData = await query.findOneAndUpdate({ key: data.key }, {
                $set: data,
            }, { new: true, upsert: true });
            return responseData;
        }
    },
};
//# sourceMappingURL=GeneralSettingService.js.map