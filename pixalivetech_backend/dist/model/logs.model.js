"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logs = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
;
const logsSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, required: true, auto: true },
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User' },
    time: { type: Number },
    date: { type: Date },
    ipAddess: { type: String },
    statusCode: { type: Number },
    activity: { type: String },
    url: { type: String },
    description: { type: String },
    processStatus: { type: Boolean },
    method: { type: String },
    level: { type: String },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});
exports.Logs = mongoose_1.default.model("Logs", logsSchema);
