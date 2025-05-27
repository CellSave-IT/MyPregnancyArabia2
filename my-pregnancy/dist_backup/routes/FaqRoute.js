"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const routes = (0, express_1.Router)();
routes.get('/', controllers_1.FaqController.get);
routes.post('/store', AuthMiddleware_1.default, controllers_1.FaqController.store);
routes.patch('/update/:id', AuthMiddleware_1.default, controllers_1.FaqController.update);
routes.delete('/delete/:id', AuthMiddleware_1.default, controllers_1.FaqController.delete);
exports.default = routes;
//# sourceMappingURL=FaqRoute.js.map