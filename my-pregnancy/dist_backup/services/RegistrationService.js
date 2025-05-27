"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RegistrationModel_1 = __importDefault(require("../models/RegistrationModel"));
const PaymentModel_1 = __importDefault(require("../models/PaymentModel"));
const GeneralSettingService_1 = __importDefault(require("./GeneralSettingService"));
const axios_1 = __importDefault(require("axios"));
const EventModel_1 = __importDefault(require("../models/EventModel"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const query = RegistrationModel_1.default;
const paymentQuery = PaymentModel_1.default;
const generalQuery = GeneralSettingService_1.default;
exports.default = {
    get: async (params) => {
        let filter = {};
        if (params.event) {
            filter = { event: new mongoose_1.Types.ObjectId(params.event) };
        }
        const items = await query
            .find(filter)
            .populate('event')
            .sort({ createdAt: -1 })
            .limit(params.pageSize)
            .skip((params.page - 1) * params.pageSize)
            .exec();
        const count = await query.countDocuments(filter);
        return {
            items,
            totalPages: Math.ceil(count / params.pageSize),
            currentPage: params.page,
        };
    },
    payment: async (data) => {
        const event = await EventModel_1.default.findById(data?.event);
        if (event?.type === 'Free') {
            await (0, sendMail_1.default)({
                to: data?.email,
                subject: 'Event Registration',
                html: 'register-email-template.html',
            });
            await (0, sendMail_1.default)({
                to: 'rsvp@mypregnancyarabia.com',
                subject: 'Registration',
                message: `${data?.fName} ${data?.lName} has registered `,
            }, {
                name: `${data?.fName} ${data?.lName}`,
                address: data?.email,
            });
            return await query.create(data);
        }
        else {
            const paymentDetails = await generalQuery.getByGroup('payment');
            const store = paymentDetails.find((item) => item?.key === 'storeId');
            const secret = paymentDetails.find((item) => item?.key === 'secretKey');
            const fees = paymentDetails.find((item) => item?.key === 'fees');
            const callback = paymentDetails.find((item) => item?.key === 'callback');
            const mode = paymentDetails.find((item) => item?.key === 'mode');
            if (!store && !secret && !fees && !callback && !mode) {
                throw new Error('Registration Failed');
            }
            const price = data?.entryType === 'Single Entry'
                ? event?.singlePrice || fees?.value
                : data?.entryType === 'Double Entry'
                    ? event?.doublePrice || fees?.value
                    : fees?.value;
            const orderId = Date.now();
            const telrPayload = {
                method: 'create',
                store: store?.value,
                authkey: secret?.value,
                framed: 0,
                order: {
                    cartid: orderId,
                    amount: parseInt(price),
                    currency: 'AED',
                    test: parseInt(mode?.value),
                    description: 'Payment for order ' + orderId,
                },
                return: {
                    authorised: callback?.value + `#/events/upcoming/${data?.event}?type=success&ref=${orderId}`,
                    declined: callback?.value + `#/events/upcoming/${data?.event}?type=declined&ref=${orderId}`,
                    cancelled: callback?.value + `#/events/upcoming/${data?.event}?type=cancelled&ref=${orderId}`,
                },
            };
            const response = await axios_1.default.post('https://secure.telr.com/gateway/order.json', telrPayload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.order && response.data.order.ref) {
                await paymentQuery.create({
                    info: JSON.stringify(data),
                    status: 'Pending',
                    amount: parseInt(price),
                    ref: response.data.order.ref,
                    regestrationId: orderId,
                });
                return {
                    paymentUrl: response.data.order.url,
                    ref: response.data.order.ref,
                };
            }
            else {
                throw new Error('Registration Failed');
            }
        }
    },
    check: async (data) => {
        const paymentDetails = await generalQuery.getByGroup('payment');
        const store = paymentDetails.find((item) => item?.key === 'storeId');
        const secret = paymentDetails.find((item) => item?.key === 'secretKey');
        if (!store && !secret) {
            throw new Error('Registration Failed');
        }
        const paymentInfo = await paymentQuery?.findOne({ regestrationId: data?.ref });
        if (paymentInfo?._id) {
            const telrPayload = {
                method: 'check',
                store: store?.value,
                authkey: secret?.value,
                order: { ref: paymentInfo?.ref },
            };
            await axios_1.default
                .post('https://secure.telr.com/gateway/order.json', telrPayload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(async (resp) => {
                if (resp.data.order?.ref) {
                    const registrationData = JSON.parse(paymentInfo.info);
                    await paymentQuery.findByIdAndUpdate(paymentInfo?._id, { $set: { status: 'Success' } }, { new: true });
                    await query.create({
                        ...registrationData,
                        event: new mongoose_1.Types.ObjectId(registrationData.event),
                        payment: new mongoose_1.Types.ObjectId(paymentInfo?._id),
                    });
                    await (0, sendMail_1.default)({
                        to: registrationData.email,
                        subject: 'Event Registration',
                        html: 'register-email-template.html',
                    });
                    await (0, sendMail_1.default)({
                        to: 'rsvp@mypregnancyarabia.com',
                        subject: 'Registration',
                        message: `${registrationData?.fName} ${registrationData?.lName} has registered `,
                    }, {
                        name: `${registrationData?.fName} ${registrationData?.lName}`,
                        address: registrationData?.email,
                    });
                    return {
                        registrationId: paymentInfo?.regestrationId,
                    };
                }
            })
                .catch((err) => {
                throw new Error('Payment Failed');
            });
        }
        else {
            throw new Error('Invalid Reference');
        }
    },
    store: async (data) => {
        const responseData = await query.create({ ...data, event: new mongoose_1.Types.ObjectId(data.event) });
        return responseData;
    },
};
//# sourceMappingURL=RegistrationService.js.map