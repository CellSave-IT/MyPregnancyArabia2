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
routes.get('/', controllers_1.GalleryController.get);
routes.post('/store', AuthMiddleware_1.default, uploader_1.imageUploader.array('images[]'), controllers_1.GalleryController.store);
routes.patch('/update/:id', AuthMiddleware_1.default, uploader_1.imageUploader.array('images[]'), controllers_1.GalleryController.update);
routes.get('/:id', controllers_1.GalleryController.getById);
routes.delete('/delete/:id', AuthMiddleware_1.default, controllers_1.GalleryController.delete);
routes.delete('/deleteImage/:id', AuthMiddleware_1.default, controllers_1.GalleryController.deleteImage);
exports.default = routes;
//# sourceMappingURL=GalleryRoute.js.map