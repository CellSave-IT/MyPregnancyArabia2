"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const utils_1 = require("../utils");
const service = services_1.GeneralSettingService;
exports.default = {
    getByKey: async (req, res) => {
        try {
            const data = await service.getByKey(req.params.key);
            utils_1.response.success({
                res,
                status: 200,
                data: data,
            });
        }
        catch (err) {
            utils_1.response.error({
                res,
                message: err.message,
                status: 500,
            });
        }
    },
    getByGroup: async (req, res) => {
        try {
            const data = await service.getByGroup(req.params.group);
            utils_1.response.success({
                res,
                status: 200,
                data: data,
            });
        }
        catch (err) {
            utils_1.response.error({
                res,
                message: err.message,
                status: 500,
            });
        }
    },
    createOrUpdate: async (req, res) => {
        try {
            const data = await service.createOrUpdate(req.body);
            utils_1.response.success({
                res,
                status: 200,
                data: data,
            });
        }
        catch (err) {
            utils_1.response.error({
                res,
                message: err.message,
                status: 500,
            });
        }
    },
};
//# sourceMappingURL=GeneralSettingController.js.map