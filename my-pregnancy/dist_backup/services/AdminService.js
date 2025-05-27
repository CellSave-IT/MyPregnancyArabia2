"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AdminModel_1 = __importDefault(require("../models/AdminModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
const query = AdminModel_1.default;
exports.default = {
    get: async () => {
        return query.find();
    },
    login: async (data) => {
        const { username, password } = data;
        const user = await query.findOne({ username });
        if (!user) {
            throw new Error('Invalid Credentials');
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid Credentials');
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
        return {
            name: user.name,
            username: user.username,
            email: user.email,
            token,
        };
    },
    register: async (data) => {
        const { username, ...rest } = data;
        const user = await query.findOne({ username });
        if (!!user) {
            throw new Error('User already exist with this username');
        }
        const response = query.create({
            name: rest.name,
            username: username,
            email: rest.email,
            password: rest.password,
        });
        return response;
    },
    update: async (data, id) => {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new Error('Invalid Id');
        }
        const response = await query.findByIdAndUpdate(id, { $set: data }, { new: true });
        return response;
    },
};
//# sourceMappingURL=AdminService.js.map