"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedUsers = exports.getSingleUsers = exports.getAllUser = exports.saveContact = void 0;
const contactUs_model_1 = require("../model/contactUs.model");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const express_validator_1 = require("express-validator");
var activity = "Contact";
/**
 * @author BalajiMurahari
 * @date 30-10-2023
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to save contact cart
 */
let saveContact = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const createContact = req.body;
            const createData = new contactUs_model_1.Contact(createContact);
            const insertData = await createData.save();
            const contact = {
                name: insertData.name,
                email: insertData.email,
                mobileNumber: insertData.mobileNumber,
                subject: insertData.subject,
                message: insertData.message
            };
            await (0, commonResponseHandler_1.sendEmail)(contact);
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Save-Contact', true, 200, insertData, ErrorMessage_1.clientError.success.savedSuccessfully);
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-Contact', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-Contact', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.saveContact = saveContact;
/**
 * @author Balaji Murahari
 * @date 30-10-2023
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get all contact
 *
 */
let getAllUser = async (req, res, next) => {
    try {
        const data = await contactUs_model_1.Contact.find({ isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'GetAll-User', true, 200, data, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'GetAll-User', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getAllUser = getAllUser;
/**
* @author Balaji Murahari
* @date 30-10-2023
* @param {Object} req
* @param {Object} res
* @param {Function} next
* @description This Function is used to get a single Users.
*/
let getSingleUsers = async (req, res, next) => {
    try {
        const userData = await contactUs_model_1.Contact.findById({ _id: req.query._id });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'Get-SingleUsers', true, 200, userData, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-SingleUsers', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getSingleUsers = getSingleUsers;
/**
 * @author Balaji Murahari
 * @date 28-10-2023
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete user .
 */
let deletedUsers = async (req, res, next) => {
    try {
        const usersData = await contactUs_model_1.Contact.findByIdAndUpdate({ _id: req.query._id }, { $set: { isDeleted: true } });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Delete-Users', true, 200, usersData, ErrorMessage_1.clientError.success.deleteSuccess);
    }
    catch (error) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Delete-Users', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, error.message);
    }
};
exports.deletedUsers = deletedUsers;
/**
 * @author Balaji Murahari
 * @date 30-10-2023
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get filtered Users.
 */
