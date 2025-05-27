"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const uploader_1 = require("../utils/uploader");
const routes = (0, express_1.Router)();
routes.get('/key/:key', controllers_1.GeneralSettingController.getByKey);
routes.get('/group/:group', controllers_1.GeneralSettingController.getByGroup);
routes.post('/store', AuthMiddleware_1.default, uploader_1.imageUploader.single('image'), controllers_1.GeneralSettingController.createOrUpdate);
exports.default = routes;
//# sourceMappingURL=GeneralSettingRoute.js.map