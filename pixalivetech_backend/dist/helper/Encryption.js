"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = exports.hashPassword = void 0;
const crypto_1 = __importDefault(require("crypto"));
const Enviornment_1 = __importDefault(require("../config/Enviornment"));
const crypto_js_1 = __importDefault(require("crypto-js"));
let password = "PixaliveService";
let conversionOutput;
/**
 * @author kaaviyan
 * @date  09-02-2025
 * @description This function return password encryption.
 * @param {String} text
 */
let hashPassword = async (text) => {
    return await new Promise((resolve, reject) => {
        const hash = crypto_1.default.createHmac("sha256", Enviornment_1.default.SALT);
        hash.update(text.toString());
        resolve(hash.digest("hex"));
    });
};
exports.hashPassword = hashPassword;
/**
 * @author Mohanraj V / Santhosh
 * @date  22-09-2022
 * @description This function return decrypted item for given encryption using cryptojs
 * @param {String} encrypted
 */
let encrypt = (textToConvert) => {
    return (conversionOutput = crypto_js_1.default.AES.encrypt(textToConvert.trim(), password.trim()).toString());
};
exports.encrypt = encrypt;
/**
 * @author kaaviyan
 * @date  09-02-2025
 * @description This function return encrypted item for given string using cryptojs
 * @param {String} text
 */
let decrypt = (textToConvert) => {
    return (conversionOutput = crypto_js_1.default.AES.decrypt(textToConvert.trim(), password.trim()).toString(crypto_js_1.default.enc.Utf8));
};
exports.decrypt = decrypt;
exports.default = { encrypt: exports.encrypt, decrypt: exports.decrypt, hashPassword: exports.hashPassword };
