"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HireDevelopers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const hireDevelopersSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, required: true, auto: true },
    adminId: { type: mongoose_1.default.Types.ObjectId, ref: "AdminPanel" },
    role: { type: String, required: true },
    title: { type: String, required: true },
    introduction: [{ type: String }],
    highlights: [{ type: String }],
    services: {
        title: { type: String },
        description: { type: String },
        items: [{ type: String }],
    },
    whyUs: {
        title: { type: String },
        description: { type: String },
    },
    hiringModels: {
        title: { type: String },
        options: [
            {
                name: { type: String },
                description: { type: String },
            },
        ],
        conclusion: { type: String },
    },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});
exports.HireDevelopers = mongoose_1.default.model("HireDeveloper", hireDevelopersSchema);
