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
routes.get('/:id', controllers_1.EventGalleryController.get);
routes.post('/store/:id', AuthMiddleware_1.default, uploader_1.imageUploader.array('images[]'), controllers_1.EventGalleryController.store);
routes.delete('/delete/:id', AuthMiddleware_1.default, controllers_1.EventGalleryController.delete);
exports.default = routes;
//# sourceMappingURL=EventGalleryRoute.js.map