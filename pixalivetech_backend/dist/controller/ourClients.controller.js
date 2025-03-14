"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOurClients = exports.updateOurClients = exports.getSingleOurClients = exports.getOurClients = exports.saveOurClients = void 0;
const ourClients_model_1 = require("../model/ourClients.model");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const express_validator_1 = require("express-validator");
var activity = "OurClients";
/**
 * @author BalajiMurhari
 * @date   08-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to update product.
 */
let saveOurClients = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const createOurClients = req.body;
            const createData = new ourClients_model_1.OurClients(createOurClients);
            const insertData = await createData.save();
            (0, commonResponseHandler_1.response)(req, res, activity, "Level-2", "Save-OurClients", true, 200, insertData, ErrorMessage_1.clientError.success.savedSuccessfully);
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, "Level-3", "Save-OurClients", false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-OurClients', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.saveOurClients = saveOurClients;
/**
 * @author BalajiMurhari
 * @date   08-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to update product.
 */
let getOurClients = async (req, res, next) => {
    try {
        const getOurClients = await ourClients_model_1.OurClients.find({ isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-OurClients', true, 200, getOurClients, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-OurClients', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getOurClients = getOurClients;
/**
 * @author Haripriyan K
 * @date 16-05-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete single User.
 */
let getSingleOurClients = async (req, res, next) => {
    try {
        const getSingleOurClients = await ourClients_model_1.OurClients.findOne({ _id: req.query._id, isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-SingleOurClients', true, 200, getSingleOurClients, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-SingleOurClients', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getSingleOurClients = getSingleOurClients;
/**
 * @author Haripriyan K
 * @date 16-05-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete single User.
 */
let updateOurClients = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const updateOurClients = req.body;
            const updateData = await ourClients_model_1.OurClients.findOne({ _id: req.body._id }, { new: true });
            if (updateData) {
                const updateValue = new ourClients_model_1.OurClients(updateOurClients);
                let update = await updateValue.updateOne({
                    $set: {
                        name: updateOurClients.name,
                        logo: updateOurClients.logo,
                        status: updateOurClients.status,
                        modifiedOn: updateOurClients.modifiedOn,
                        modifiedBy: updateOurClients.modifiedBy
                    }
                });
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Update-OurClients', true, 200, update, ErrorMessage_1.clientError.success.updateSuccess);
            }
            else {
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-OurClients', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, "Data not found");
            }
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-OurClients', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-OurClients', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.updateOurClients = updateOurClients;
/**
 * @author Haripriyan K
 * @date 16-05-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete single User.
 */
let deleteOurClients = async (req, res, next) => {
    try {
        const deleteOurClients = await ourClients_model_1.OurClients.findOneAndUpdate({ _id: req.query._id }, {
            $set: {
                isDeleted: true,
                modifiedOn: req.body.modifiedOn,
                modifiedBy: req.body.modifiedBy
            }
        }, { new: true });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Delete-OurClients', true, 200, deleteOurClients, ErrorMessage_1.clientError.success.deleteSuccess);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Delete-OurClients', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.deleteOurClients = deleteOurClients;
