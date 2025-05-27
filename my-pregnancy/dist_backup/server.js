"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const utils_1 = require("./utils");
const routes_1 = __importDefault(require("./routes"));
async function init() {
    const app = (0, express_1.default)();
    dotenv_1.default.config();
    await (0, db_1.default)()
        .then(() => {
        console.log('Connect to database');
    })
        .catch((err) => {
        console.log('Error database connect', err);
    });
    app.use((0, cors_1.default)({
        origin: function (origin, callback) {
            if (!origin || utils_1.allowOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    }));
    app.use('/uploads', express_1.default.static('./uploads'));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.get('/', (req, res) => {
        res.send('API is Working Perfectly Fine!');
    });
    app.use('/api/v1', routes_1.default);
    app.listen({ port: process.env.PORT }, () => {
        console.log(`Server ready at http://localhost:${process.env.PORT}`);
    });
}
exports.default = init;
//# sourceMappingURL=server.js.map