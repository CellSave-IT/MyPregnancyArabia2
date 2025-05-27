"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const services_1 = require("../services");
const validations_1 = require("../validations");
const joi_1 = __importDefault(require("joi"));
const service = services_1.RegistrationService;
const validation = validations_1.RegistrationValidation;
exports.default = {
    get: async (req, res) => {
        try {
            const params = req.query;
            const data = await service.get({
                page: params.page || 1,
                pageSize: params.pageSize || 10,
                event: params?.event || null,
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
    payment: async (req, res) => {
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
                const data = await service.payment(value);
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
    check: async (req, res) => {
        try {
            const validationSchema = joi_1.default.object({
                ref: joi_1.default.string().required(),
            });
            const { value, error } = validationSchema.validate(req.body);
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
                const data = await service.check(value);
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
//# sourceMappingURL=RegistrationController.js.map