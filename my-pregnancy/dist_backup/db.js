"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function dbConnection() {
    const DB_URL = process.env.NODE_ENV === 'production' ? process.env.MONGO_PROD_URI : process.env.MONGO_DEV_URI;
    const DB_NAME = process.env.NODE_ENV === 'production' ? process.env.MONGO_PROD_DB_NAME : process.env.MONGO_DEV_DB_NAME;
    await mongoose_1.default.connect(DB_URL, {
        dbName: DB_NAME,
        serverSelectionTimeoutMS: 30000,
    });
}
exports.default = dbConnection;
//# sourceMappingURL=db.js.map