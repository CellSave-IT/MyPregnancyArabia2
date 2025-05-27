"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const routes = (0, express_1.Router)();
routes.get('/', AuthMiddleware_1.default, controllers_1.RegistrationController.get);
routes.post('/payment', controllers_1.RegistrationController.payment);
routes.post('/payment/check', controllers_1.RegistrationController.check);
routes.post('/store', controllers_1.RegistrationController.store);
exports.default = routes;
//# sourceMappingURL=RegistrationRoute.js.map