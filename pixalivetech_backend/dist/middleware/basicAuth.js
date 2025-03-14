"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicAuthUser = void 0;
const basic_auth_1 = __importDefault(require("basic-auth"));
const ErrorMessage_1 = require("../helper/ErrorMessage");
let basicAuthUser = function (req, res, next) {
    const credentials = (0, basic_auth_1.default)(req);
    console.log('credentials', credentials);
    if (!credentials || credentials.name !== process.env.basicAuthUser || credentials.pass !== process.env.basicAuthKey) {
        res.setHeader('WWW-Authenticate', 'Basic realm="example"');
        res.status(401).json({
            success: false,
            statusCode: 499,
            message: ErrorMessage_1.clientError.token.unauthRoute,
        });
        return; // ✅ Explicit return to ensure the function does not continue
    }
    next(); // ✅ Ensures the function always returns void
};
exports.basicAuthUser = basicAuthUser;
exports.default = { basicAuthUser: exports.basicAuthUser };
