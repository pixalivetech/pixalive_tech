"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const basicAuth_1 = require("../middleware/basicAuth");
const validator_1 = require("../middleware/validator");
const login_controller_1 = require("../controller/login.controller");
const router = (0, express_1.Router)();
router.post('/adminLogin', basicAuth_1.basicAuthUser, (0, validator_1.checkRequestBodyParams)('email'), (0, validator_1.checkRequestBodyParams)('password'), login_controller_1.adminLogin);
exports.default = router;
