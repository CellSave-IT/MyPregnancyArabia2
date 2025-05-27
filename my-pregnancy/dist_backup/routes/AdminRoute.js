"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const routes = (0, express_1.Router)();
routes.get('/', AuthMiddleware_1.default, controllers_1.AdminController.get);
routes.post('/login', controllers_1.AdminController.login);
routes.post('/register', AuthMiddleware_1.default, controllers_1.AdminController.register);
routes.patch('/update/:id', AuthMiddleware_1.default, controllers_1.AdminController.update);
exports.default = routes;
//# sourceMappingURL=AdminRoute.js.map