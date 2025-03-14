"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
;
const userSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, required: true, auto: true },
    userName: { type: String },
    mobile: { type: Number },
    email: { type: String, lowercase: true, trim: true },
    password: { type: String, },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});
exports.Admin = mongoose_1.default.model("AdminPanel", userSchema);
