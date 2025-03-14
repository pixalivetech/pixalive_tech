"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWorkingSpace = exports.updateWorkingSpace = exports.getSingleWorkingSpace = exports.getWorkingSpace = exports.saveWorkingSpace = void 0;
const coworkingSpace_model_1 = require("../model/coworkingSpace.model");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const express_validator_1 = require("express-validator");
var activity = "WorkingSpace";
/**
 * @author BalajiMurhari
 * @date   08-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to update product.
 */
let saveWorkingSpace = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const createWorkingSpace = req.body;
            const createData = new coworkingSpace_model_1.WorkingSpace(createWorkingSpace);
            const insertData = await createData.save();
            (0, commonResponseHandler_1.response)(req, res, activity, "Level-2", "Save-WorkingSpace", true, 200, insertData, ErrorMessage_1.clientError.success.savedSuccessfully);
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, "Level-3", "Save-WorkingSpace", false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-WorkingSpace', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.saveWorkingSpace = saveWorkingSpace;
/**
 * @author BalajiMurhari
 * @date   08-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to update product.
 */
let getWorkingSpace = async (req, res, next) => {
    try {
        const getWorkingSpace = await coworkingSpace_model_1.WorkingSpace.find({ isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-WorkingSpace', true, 200, getWorkingSpace, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-WorkingSpace', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getWorkingSpace = getWorkingSpace;
/**
 * @author Haripriyan K
 * @date 16-05-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete single User.
 */
let getSingleWorkingSpace = async (req, res, next) => {
    try {
        const getSingleWorkingSpace = await coworkingSpace_model_1.WorkingSpace.findOne({ _id: req.query._id, isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-SingleWorkingSpace', true, 200, getSingleWorkingSpace, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-SingleWorkingSpace', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getSingleWorkingSpace = getSingleWorkingSpace;
/**
 * @author Haripriyan K
 * @date 16-05-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete single User.
 */
let updateWorkingSpace = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const updateWorkingSpace = req.body;
            const updateData = await coworkingSpace_model_1.WorkingSpace.findOne({ _id: req.body._id }, { new: true });
            if (updateData) {
                const updateValue = new coworkingSpace_model_1.WorkingSpace(updateWorkingSpace);
                let update = await updateValue.updateOne({
                    $set: {
                        title: updateWorkingSpace.title,
                        introduction: updateWorkingSpace.introduction,
                        facilities: updateWorkingSpace.facilities,
                        waysOfWorking: updateWorkingSpace.waysOfWorking,
                        status: updateWorkingSpace.status,
                        modifiedOn: updateWorkingSpace.modifiedOn,
                        modifiedBy: updateWorkingSpace.modifiedBy
                    }
                });
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Update-WorkingSpace', true, 200, update, ErrorMessage_1.clientError.success.updateSuccess);
            }
            else {
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-WorkingSpace', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, "Data not found");
            }
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-WorkingSpace', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-WorkingSpace', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.updateWorkingSpace = updateWorkingSpace;
/**
 * @author Haripriyan K
 * @date 16-05-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete single User.
 */
let deleteWorkingSpace = async (req, res, next) => {
    try {
        const deleteWorkingSpace = await coworkingSpace_model_1.WorkingSpace.findOneAndUpdate({ _id: req.query._id }, {
            $set: {
                isDeleted: true,
                modifiedOn: req.body.modifiedOn,
                modifiedBy: req.body.modifiedBy
            }
        }, { new: true });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Delete-WorkingSpace', true, 200, deleteWorkingSpace, ErrorMessage_1.clientError.success.deleteSuccess);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Delete-WorkingSpace', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.deleteWorkingSpace = deleteWorkingSpace;
