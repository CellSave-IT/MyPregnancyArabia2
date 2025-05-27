"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const removeFile = (oldPath) => {
    const fullPath = '.' + path_1.default.resolve(oldPath);
    if (fs_1.default.existsSync(fullPath)) {
        fs_1.default.unlink(fullPath, (err) => {
            if (err) {
                console.error('Failed to delete old image:', err);
            }
        });
    }
};
exports.default = removeFile;
//# sourceMappingURL=removeFile.js.map