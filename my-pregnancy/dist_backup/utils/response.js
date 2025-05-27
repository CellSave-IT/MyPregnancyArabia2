"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    success: ({ res, message, status, data }) => {
        res.status(status || 200).json({
            success: true,
            message: message || "success",
            data,
        });
    },
    error: ({ res, message, status, errors }) => {
        res.status(status || 500).json({
            success: false,
            message: message || "error",
            errors,
        });
    },
};
//# sourceMappingURL=response.js.map