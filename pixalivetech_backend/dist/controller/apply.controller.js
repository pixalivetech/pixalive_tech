"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedApply = exports.getSingleApply = exports.getAllApply = exports.saveApply = void 0;
const apply_model_1 = require("../model/apply.model");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const express_validator_1 = require("express-validator");
var activity = "Apply";
/**
 * @author BalajiMurahari
 * @date 30-10-2023
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to save Apply cart
 */
let saveApply = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const createApply = req.body;
            const createData = new apply_model_1.Apply(createApply);
            const insertData = await createData.save();
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Save-Apply', true, 200, insertData, ErrorMessage_1.clientError.success.savedSuccessfully);
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-Apply', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-Apply', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.saveApply = saveApply;
/**
 * @author Balaji Murahari
 * @date 30-10-2023
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get all Apply
 *
 */
let getAllApply = async (req, res, next) => {
    try {
        const data = await apply_model_1.Apply.find({ isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'GetAll-User', true, 200, data, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'GetAll-User', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getAllApply = getAllApply;
/**
* @author Balaji Murahari
* @date 30-10-2023
* @param {Object} req
* @param {Object} res
* @param {Function} next
* @description This Function is used to get a single Apply.
*/
let getSingleApply = async (req, res, next) => {
    try {
        const userData = await apply_model_1.Apply.findById({ _id: req.query._id });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'Get-SingleApply', true, 200, userData, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-SingleApply', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getSingleApply = getSingleApply;
/**
 * @author Balaji Murahari
 * @date 28-10-2023
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete user .
 */
let deletedApply = async (req, res, next) => {
    try {
        const ApplyData = await apply_model_1.Apply.findByIdAndUpdate({ _id: req.query._id }, { $set: { isDeleted: true } });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Delete-Apply', true, 200, ApplyData, ErrorMessage_1.clientError.success.deleteSuccess);
    }
    catch (error) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Delete-Apply', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, error.message);
    }
};
exports.deletedApply = deletedApply;
/**
 * @author Balaji Murahari
 * @date 30-10-2023
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get filtered Apply.
 */
