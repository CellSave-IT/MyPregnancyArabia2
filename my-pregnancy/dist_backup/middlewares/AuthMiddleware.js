"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token);
    if (!token) {
        return utils_1.response.error({ res, status: 401, message: 'Unauthorized', errors: [] });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return utils_1.response.error({ res, status: 401, message: 'Unauthorized', errors: [] });
        }
        else {
            req.user = decoded;
            next();
        }
    }
    catch (e) {
        utils_1.response.error({ res, status: 400, message: 'Token is invalid', errors: [] });
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map