"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOpenings = exports.updateOpenings = exports.getSingleOpenings = exports.getOpenings = exports.saveOpenings = void 0;
const jobOpenings_model_1 = require("../model/jobOpenings.model");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const express_validator_1 = require("express-validator");
var activity = "Openings";
/**
 * @author BalajiMurhari
 * @date   08-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to update product.
 */
let saveOpenings = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const createOpenings = req.body;
            const createData = new jobOpenings_model_1.Jobopenings(createOpenings);
            const insertData = await createData.save();
            (0, commonResponseHandler_1.response)(req, res, activity, "Level-2", "Save-Openings", true, 200, insertData, ErrorMessage_1.clientError.success.savedSuccessfully);
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, "Level-3", "Save-Openings", false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-Openings', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.saveOpenings = saveOpenings;
/**
 * @author BalajiMurhari
 * @date   08-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to update product.
 */
let getOpenings = async (req, res, next) => {
    try {
        const getOpenings = await jobOpenings_model_1.Jobopenings.find({ isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-Openings', true, 200, getOpenings, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-Openings', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getOpenings = getOpenings;
/**
 * @author Haripriyan K
 * @date 16-05-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete single User.
 */
let getSingleOpenings = async (req, res, next) => {
    try {
        const getSingleOpenings = await jobOpenings_model_1.Jobopenings.findOne({ _id: req.query._id, isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-SingleOpenings', true, 200, getSingleOpenings, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-SingleOpenings', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getSingleOpenings = getSingleOpenings;
/**
 * @author Haripriyan K
 * @date 16-05-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete single User.
 */
let updateOpenings = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const updateOpenings = req.body;
            const updateData = await jobOpenings_model_1.Jobopenings.findOne({ _id: req.body._id }, { new: true });
            if (updateData) {
                const updateValue = new jobOpenings_model_1.Jobopenings(updateOpenings);
                let update = await updateValue.updateOne({
                    $set: {
                        title: updateOpenings.title,
                        description: updateOpenings.description,
                        qualifications: updateOpenings.qualifications,
                        extraQualifications: updateOpenings.extraQualifications,
                        email: updateOpenings.email,
                        vacancies: updateOpenings.vacancies,
                        status: updateOpenings.status,
                        modifiedOn: updateOpenings.modifiedOn,
                        modifiedBy: updateOpenings.modifiedBy
                    }
                });
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Update-Openings', true, 200, update, ErrorMessage_1.clientError.success.updateSuccess);
            }
            else {
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-Openings', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, "Data not found");
            }
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-Openings', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-Openings', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.updateOpenings = updateOpenings;
/**
 * @author Haripriyan K
 * @date 16-05-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete single User.
 */
let deleteOpenings = async (req, res, next) => {
    try {
        const deleteOpenings = await jobOpenings_model_1.Jobopenings.findOneAndUpdate({ _id: req.query._id }, {
            $set: {
                isDeleted: true,
                modifiedOn: req.body.modifiedOn,
                modifiedBy: req.body.modifiedBy
            }
        }, { new: true });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Delete-Openings', true, 200, deleteOpenings, ErrorMessage_1.clientError.success.deleteSuccess);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Delete-Openings', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.deleteOpenings = deleteOpenings;
