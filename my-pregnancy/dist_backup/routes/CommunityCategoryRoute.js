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
routes.get('/', controllers_1.CommunityCategoryController.get);
routes.post('/store', uploader_1.imageUploader.single('image'), AuthMiddleware_1.default, controllers_1.CommunityCategoryController.store);
routes.patch('/update/:id', uploader_1.imageUploader.single('image'), AuthMiddleware_1.default, controllers_1.CommunityCategoryController.update);
routes.get('/:id', controllers_1.CommunityCategoryController.getById);
routes.delete('/delete/:id', AuthMiddleware_1.default, controllers_1.CommunityCategoryController.delete);
exports.default = routes;
//# sourceMappingURL=CommunityCategoryRoute.js.map