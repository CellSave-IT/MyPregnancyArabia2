"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommunityModel_1 = __importDefault(require("../models/CommunityModel"));
const DiaryModel_1 = __importDefault(require("../models/DiaryModel"));
const EventModel_1 = __importDefault(require("../models/EventModel"));
const utils_1 = require("../utils");
exports.default = {
    get: async (req, res) => {
        try {
            const [totalCommunities, totalDiaries, totalUpcomingEvents, totalPastEvents] = await Promise.all([
                CommunityModel_1.default.countDocuments(),
                DiaryModel_1.default.countDocuments(),
                EventModel_1.default.countDocuments({ date: { $gte: new Date() } }),
                EventModel_1.default.countDocuments({ date: { $lte: new Date() } }),
            ]);
            utils_1.response.success({
                res,
                status: 200,
                data: {
                    totalCommunities,
                    totalDiaries,
                    totalUpcomingEvents,
                    totalPastEvents,
                },
            });
        }
        catch (err) {
            utils_1.response.error({
                res,
                message: err.message,
                status: 500,
            });
        }
    },
};
//# sourceMappingURL=DashboardController.js.map