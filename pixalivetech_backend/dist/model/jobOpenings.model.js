"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jobopenings = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joobOpeningsSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, required: true, auto: true },
    adminId: { type: mongoose_1.default.Types.ObjectId, ref: "AdminPanel" },
    title: { type: String, required: true },
    description: [{ type: String }],
    qualifications: [{ type: String }],
    extraQualifications: [{ type: String }],
    email: { type: String },
    vacancies: { type: Number },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
}, { timestamps: true } // Automatically adds createdAt and updatedAt
);
exports.Jobopenings = mongoose_1.default.model("Jobopening", joobOpeningsSchema);
