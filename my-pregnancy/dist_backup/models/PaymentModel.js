"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var Status;
(function (Status) {
    Status["Pending"] = "Pending";
    Status["Paid"] = "Paid";
    Status["Failed"] = "Failed";
})(Status || (Status = {}));
const schema = new mongoose_1.Schema({
    info: { type: String, required: true },
    status: { type: String, enum: Object.values(Status), default: Status.Pending },
    amount: { type: Number, required: true },
    regestrationId: { type: String, required: true },
    ref: { type: String, required: true, unique: true },
}, {
    timestamps: true,
});
const PaymentModel = (0, mongoose_1.model)('Payments', schema);
exports.default = PaymentModel;
//# sourceMappingURL=PaymentModel.js.map