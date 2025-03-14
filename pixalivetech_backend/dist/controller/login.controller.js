"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = void 0;
const tokenManager_1 = __importDefault(require("../utils/tokenManager"));
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const admin_model_1 = require("../model/admin.model");
const activity = "ADMIN";
/**
 * @author Sivakumar R
 * @date 16-05-2024
 * @description This function handles admin login.
 */
const adminLogin = async (req, res, next) => {
    try {
        const adminDetails = await admin_model_1.Admin.findOne({ $and: [{ isDeleted: false }, { email: req.body.email }] });
        if (adminDetails) {
            if (adminDetails["status"] === 2) {
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'Login-Admin', false, 499, {}, ErrorMessage_1.clientError.account.inActive);
            }
            else if (adminDetails["password"] !== req.body.password) {
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'Login-Admin', false, 200, {}, "Password is MissMatch !");
            }
            else {
                const token = await tokenManager_1.default.CreateJWTToken({
                    id: adminDetails["_id"],
                    email: adminDetails["email"]
                });
                // ✅ Explicitly defining the object types
                const details = {
                    _id: adminDetails._id,
                    email: adminDetails.email
                };
                let finalResult = {
                    loginType: 'Admin',
                    adminDetails: details,
                    token: token
                };
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'Login-Admin', true, 200, finalResult, ErrorMessage_1.clientError.success.loginSuccess);
            }
        }
        else {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'Login-Admin', false, 200, {}, "Admin Not Registered");
        }
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Login-Admin', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.adminLogin = adminLogin;
