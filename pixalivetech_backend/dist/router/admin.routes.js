"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const admin_controller_1 = require("../controller/admin.controller");
const basicAuth_1 = require("../middleware/basicAuth");
const validator_1 = require("../middleware/validator");
const tokenManager_1 = require("../utils/tokenManager");
router.get('/', //get all user
basicAuth_1.basicAuthUser, tokenManager_1.checkSession, admin_controller_1.getAdmin);
router.get('/getSingleAdmin', //get all user
basicAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, validator_1.checkQuery)('_id'), admin_controller_1.getAdmin);
exports.default = router;
