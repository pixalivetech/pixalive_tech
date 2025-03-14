"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLaptopRental = exports.updateLaptopRental = exports.getSingleLaptopRental = exports.getLaptopRental = exports.saveLaptopRental = void 0;
const laptopRental_model_1 = require("../model/laptopRental.model");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const express_validator_1 = require("express-validator");
var activity = "LaptopRental";
/**
 * @author BalajiMurhari
 * @date   08-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to update product.
 */
let saveLaptopRental = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const createLaptopRental = req.body;
            const createData = new laptopRental_model_1.LaptopRental(createLaptopRental);
            const insertData = await createData.save();
            (0, commonResponseHandler_1.response)(req, res, activity, "Level-2", "Save-LaptopRental", true, 200, insertData, ErrorMessage_1.clientError.success.savedSuccessfully);
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, "Level-3", "Save-LaptopRental", false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-LaptopRental', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.saveLaptopRental = saveLaptopRental;
/**
 * @author BalajiMurhari
 * @date   08-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to update product.
 */
let getLaptopRental = async (req, res, next) => {
    try {
        const getLaptopRental = await laptopRental_model_1.LaptopRental.find({ isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-LaptopRental', true, 200, getLaptopRental, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-LaptopRental', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getLaptopRental = getLaptopRental;
/**
 * @author Haripriyan K
 * @date 16-05-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete single User.
 */
let getSingleLaptopRental = async (req, res, next) => {
    try {
        const getSingleLaptopRental = await laptopRental_model_1.LaptopRental.findOne({ _id: req.query._id, isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-SingleLaptopRental', true, 200, getSingleLaptopRental, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-SingleLaptopRental', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getSingleLaptopRental = getSingleLaptopRental;
/**
 * @author Haripriyan K
 * @date 16-05-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete single User.
 */
let updateLaptopRental = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const updateLaptopRental = req.body;
            const updateData = await laptopRental_model_1.LaptopRental.findOne({ _id: req.body._id }, { new: true });
            if (updateData) {
                const updateValue = new laptopRental_model_1.LaptopRental(updateLaptopRental);
                let update = await updateValue.updateOne({
                    $set: {
                        title: updateLaptopRental.title,
                        desc: updateLaptopRental.desc,
                        price: updateLaptopRental.price,
                        img: updateLaptopRental.img,
                        status: updateLaptopRental.status,
                        modifiedOn: updateLaptopRental.modifiedOn,
                        modifiedBy: updateLaptopRental.modifiedBy
                    }
                });
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Update-LaptopRental', true, 200, update, ErrorMessage_1.clientError.success.updateSuccess);
            }
            else {
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-LaptopRental', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, "Data not found");
            }
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-LaptopRental', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-LaptopRental', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.updateLaptopRental = updateLaptopRental;
/**
 * @author Haripriyan K
 * @date 16-05-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete single User.
 */
let deleteLaptopRental = async (req, res, next) => {
    try {
        const deleteLaptopRental = await laptopRental_model_1.LaptopRental.findOneAndUpdate({ _id: req.query._id }, {
            $set: {
                isDeleted: true,
                modifiedOn: req.body.modifiedOn,
                modifiedBy: req.body.modifiedBy
            }
        }, { new: true });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Delete-LaptopRental', true, 200, deleteLaptopRental, ErrorMessage_1.clientError.success.deleteSuccess);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Delete-LaptopRental', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.deleteLaptopRental = deleteLaptopRental;
