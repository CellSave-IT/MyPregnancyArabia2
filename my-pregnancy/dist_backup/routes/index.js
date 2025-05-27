"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AdminRoute_1 = __importDefault(require("./AdminRoute"));
const TestimonialRoute_1 = __importDefault(require("./TestimonialRoute"));
const FaqRoute_1 = __importDefault(require("./FaqRoute"));
const DiaryRoute_1 = __importDefault(require("./DiaryRoute"));
const CommunityCategoryRoute_1 = __importDefault(require("./CommunityCategoryRoute"));
const CommunityRoute_1 = __importDefault(require("./CommunityRoute"));
const PartnerRoute_1 = __importDefault(require("./PartnerRoute"));
const EnquiryRoute_1 = __importDefault(require("./EnquiryRoute"));
const SubscribeRoute_1 = __importDefault(require("./SubscribeRoute"));
const BabySizeRoute_1 = __importDefault(require("./BabySizeRoute"));
const EventRoute_1 = __importDefault(require("./EventRoute"));
const EventGalleryRoute_1 = __importDefault(require("./EventGalleryRoute"));
const GeneralSettingRoute_1 = __importDefault(require("./GeneralSettingRoute"));
const RegistrationRoute_1 = __importDefault(require("./RegistrationRoute"));
const DashboardRoute_1 = __importDefault(require("./DashboardRoute"));
const DownloadRoute_1 = __importDefault(require("./DownloadRoute"));
const GalleryRoute_1 = __importDefault(require("./GalleryRoute"));
const express_1 = require("express");
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const routes = (0, express_1.Router)();
routes.use('/admin', AdminRoute_1.default);
routes.use('/testimonials', TestimonialRoute_1.default);
routes.use('/faqs', FaqRoute_1.default);
routes.use('/diaries', DiaryRoute_1.default);
routes.use('/communityCategories', CommunityCategoryRoute_1.default);
routes.use('/communities', CommunityRoute_1.default);
routes.use('/partners', PartnerRoute_1.default);
routes.use('/enquiry', EnquiryRoute_1.default);
routes.use('/subscribes', SubscribeRoute_1.default);
routes.use('/babySizes', BabySizeRoute_1.default);
routes.use('/events', EventRoute_1.default);
routes.use('/events/galleries', EventGalleryRoute_1.default);
routes.use('/generalSettings', GeneralSettingRoute_1.default);
routes.use('/registrations', RegistrationRoute_1.default);
routes.use('/dashboard', DashboardRoute_1.default);
routes.use('/downloads', DownloadRoute_1.default);
routes.use('/galleries', GalleryRoute_1.default);
routes.get('/test-mail', async (req, res) => {
    try {
        await (0, sendMail_1.default)({
            to: 'maqcadet3@gmail.com',
            subject: 'Event Registration',
            message: 'Thank you for your registration! Our team will get in touch with you shortly once your seat is confirmed.',
        });
        await (0, sendMail_1.default)({
            to: 'maqcadet3@gmail.com',
            subject: 'Registration',
            message: `Test has registered `,
        }, {
            name: `Test Name`,
            address: `mailer9861@gmail.com`,
        });
        res.status(status || 500).json({
            success: true,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err,
        });
    }
});
const emailAddresses = ['rsvp@mypregnancyarabia.com', 'marketing@cellsave.com'];
routes.get('/baby-size', async (req, res) => {
    try {
        await (0, sendMail_1.default)({
            to: emailAddresses,
            subject: 'BABY SIZE FILE',
            message: `The baby size file is downloaded please check website for details `,
        }, {
            name: `MPA`,
            address: `mailer9861@gmail.com`,
        });
        res.status(status || 500).json({
            success: true,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err,
        });
    }
});
exports.default = routes;
//# sourceMappingURL=index.js.map