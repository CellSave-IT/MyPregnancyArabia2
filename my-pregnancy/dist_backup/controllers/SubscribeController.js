"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const services_1 = require("../services");
const validations_1 = require("../validations");
const service = services_1.SubscribeService;
const validation = validations_1.SubscribeValidation;
exports.default = {
    get: async (req, res) => {
        try {
            const params = req.query;
            const data = await service.get({
                page: params.page || 1,
                pageSize: params.pageSize || 10,
            });
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
    store: async (req, res) => {
        try {
            const { value, error } = validation.validate(req.body);
            if (!!error) {
                utils_1.response.error({
                    res,
                    message: error.details[0].message,
                    status: 422,
                    errors: error.details?.map((item) => item?.message),
                });
                return;
            }
            else {
                const data = await service.store(value);
                utils_1.response.success({
                    res,
                    status: 200,
                    data: data,
                });
            }
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
//# sourceMappingURL=SubscribeController.js.map