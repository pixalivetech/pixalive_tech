"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDevelopers = exports.updateDevelopers = exports.getSingleDevelopers = exports.getDevelopers = exports.saveDevelopers = void 0;
const hireDevelopers_model_1 = require("../model/hireDevelopers.model");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const express_validator_1 = require("express-validator");
var activity = "Developers";
/**
 * @author BalajiMurhari
 * @date   08-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to update product.
 */
let saveDevelopers = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const createDevelopers = req.body;
            const createData = new hireDevelopers_model_1.HireDevelopers(createDevelopers);
            const insertData = await createData.save();
            (0, commonResponseHandler_1.response)(req, res, activity, "Level-2", "Save-Developers", true, 200, insertData, ErrorMessage_1.clientError.success.savedSuccessfully);
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, "Level-3", "Save-Developers", false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-Developers', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.saveDevelopers = saveDevelopers;
/**
 * @author BalajiMurhari
 * @date   08-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to update product.
 */
let getDevelopers = async (req, res, next) => {
    try {
        const getDevelopers = await hireDevelopers_model_1.HireDevelopers.find({ isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-Developers', true, 200, getDevelopers, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-Developers', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getDevelopers = getDevelopers;
/**
 * @author Haripriyan K
 * @date 16-05-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete single User.
 */
let getSingleDevelopers = async (req, res, next) => {
    try {
        const getSingleDevelopers = await hireDevelopers_model_1.HireDevelopers.findOne({ _id: req.query._id, isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-SingleDevelopers', true, 200, getSingleDevelopers, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-SingleDevelopers', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getSingleDevelopers = getSingleDevelopers;
/**
 * @author Haripriyan K
 * @date 16-05-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete single User.
 */
let updateDevelopers = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const updateDevelopers = req.body;
            const updateData = await hireDevelopers_model_1.HireDevelopers.findOne({ _id: req.body._id }, { new: true });
            if (updateData) {
                const updateValue = new hireDevelopers_model_1.HireDevelopers(updateDevelopers);
                let update = await updateValue.updateOne({
                    $set: {
                        role: updateDevelopers.role,
                        title: updateDevelopers.title,
                        introduction: updateDevelopers.introduction,
                        highlights: updateDevelopers.highlights,
                        services: updateDevelopers.services,
                        whyUs: updateDevelopers.whyUs,
                        hiringModels: updateDevelopers.hiringModels,
                        status: updateDevelopers.status,
                        modifiedOn: updateDevelopers.modifiedOn,
                        modifiedBy: updateDevelopers.modifiedBy
                    }
                });
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Update-Developers', true, 200, update, ErrorMessage_1.clientError.success.updateSuccess);
            }
            else {
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-Developers', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, "Data not found");
            }
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-Developers', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-Developers', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.updateDevelopers = updateDevelopers;
/**
 * @author Haripriyan K
 * @date 16-05-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete single User.
 */
let deleteDevelopers = async (req, res, next) => {
    try {
        const deleteDevelopers = await hireDevelopers_model_1.HireDevelopers.findOneAndUpdate({ _id: req.query._id }, {
            $set: {
                isDeleted: true,
                modifiedOn: req.body.modifiedOn,
                modifiedBy: req.body.modifiedBy
            }
        }, { new: true });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Delete-Developers', true, 200, deleteDevelopers, ErrorMessage_1.clientError.success.deleteSuccess);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Delete-Developers', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.deleteDevelopers = deleteDevelopers;
