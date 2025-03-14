"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSession = exports.CreateJWTToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const activity = 'token';
/**
 * @author Mohanraj V
 * @date 10-01-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to token creation
 */
let CreateJWTToken = (data = {}) => {
    let tokenData = {};
    if (data.id)
        tokenData.id = data.id;
    if (data.email)
        tokenData.email = data.email;
    return jsonwebtoken_1.default.sign(tokenData, 'PixaliveTech', { expiresIn: '365d' });
};
exports.CreateJWTToken = CreateJWTToken;
/**
 * @author Mohanraj V
 * @date 10-01-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to Chech the session and Verify the token
 */
let checkSession = async (req, res, next) => {
    const token = req.headers['token'];
    if (token) {
        const headerType = token.split(' ')[0]; // Don't change
        const tokenValue = token.split(' ')[1].trim(); // Don't change
        if (headerType.trim() === "Bearer") {
            try {
                jsonwebtoken_1.default.verify(tokenValue, 'PixaliveTech', function (err, tokendata) {
                    if (err) {
                        return res.status(400).json({ message: ErrorMessage_1.clientError.token.sessionExpire });
                    }
                    if (tokendata) {
                        console.log('tokendata', tokendata);
                        req.body.loginId = tokendata.userId;
                        req.body.loginUserName = tokendata.userName;
                        req.body.createdBy = tokendata.userName;
                        req.body.createdOn = new Date();
                        req.body.modifiedBy = tokendata.userName;
                        req.body.modifiedOn = new Date();
                        return next();
                    }
                });
            }
            catch (err) {
                return (0, commonResponseHandler_1.response)(req, res, activity, 'Check-Session', 'Level-3', false, 499, {}, ErrorMessage_1.clientError.token.unauthRoute, err.message);
            }
        }
    }
    else {
        return (0, commonResponseHandler_1.response)(req, res, activity, 'Check-Session', 'Level-3', false, 499, {}, ErrorMessage_1.clientError.token.unauthRoute);
    }
};
exports.checkSession = checkSession;
exports.default = { CreateJWTToken: exports.CreateJWTToken, checkSession: exports.checkSession };
