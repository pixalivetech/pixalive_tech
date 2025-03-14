"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkingSpace = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const workingSpaceSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, required: true, auto: true },
    adminId: { type: mongoose_1.default.Types.ObjectId, ref: "AdminPanel" },
    title: { type: String },
    introduction: [{ type: String }],
    facilities: [{ type: String }],
    waysOfWorking: [
        {
            type: { type: String },
            description: { type: String },
            features: [{ type: String }]
        }
    ],
    status: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false },
    createdOn: { type: Date },
    createdAt: { type: Date, default: Date.now, index: true },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});
exports.WorkingSpace = mongoose_1.default.model("CoWorkingSpace", workingSpaceSchema);
