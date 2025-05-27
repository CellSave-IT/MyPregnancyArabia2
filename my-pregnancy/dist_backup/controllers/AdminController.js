"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AdminService_1 = __importDefault(require("../services/AdminService"));
const validations_1 = require("../validations");
const utils_1 = require("../utils");
const service = AdminService_1.default;
const validation = validations_1.AdminValidation;
exports.default = {
    login: async (req, res) => {
        try {
            const { value, error } = validation.loginValidationSchema.validate(req.body);
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
                const data = await service.login(value);
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
                status: err.status || 500,
            });
        }
    },
    get: async (req, res) => {
        try {
            const data = await service.get();
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
                status: err.status || 500,
            });
        }
    },
    update: async (req, res) => {
        try {
            const { value, error } = validation.updateValidationSchema.validate(req.body);
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
                const data = await service.update(req.body, req?.params?.id);
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
                status: err.status || 500,
            });
        }
    },
    register: async (req, res) => {
        try {
            const { value, error } = validation.registerValidationSchema.validate(req.body);
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
                const data = await service.register(value);
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
                status: err.status || 500,
            });
        }
    },
};
//# sourceMappingURL=AdminController.js.map