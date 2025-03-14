"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleAdmin = exports.getAdmin = void 0;
const admin_model_1 = require("../model/admin.model");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const activity = 'ADMIN';
/**
 * @author Sivakumar R
 * @date 16-05-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get all User.
 */
let getAdmin = async (req, res, next) => {
    try {
        const AdminList = await admin_model_1.Admin.find({ isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-User', true, 200, AdminList, ErrorMessage_1.clientError.success.success);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-User', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getAdmin = getAdmin;
let getSingleAdmin = async (req, res, next) => {
    try {
        const AdminList = await admin_model_1.Admin.findOne({ isDeleted: false }, { _id: req.query._id });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-User', true, 200, AdminList, ErrorMessage_1.clientError.success.success);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-User', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getSingleAdmin = getSingleAdmin;
