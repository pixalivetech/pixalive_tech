"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const apply_controller_1 = require("../controller/apply.controller");
const basicAuth_1 = require("../middleware/basicAuth");
const validator_1 = require("../middleware/validator");
const tokenManager_1 = require("../utils/tokenManager");
router.post('/', //save contact  // without checking session
basicAuth_1.basicAuthUser, apply_controller_1.saveApply);
router.get('/', //get all contact   
basicAuth_1.basicAuthUser, tokenManager_1.checkSession, apply_controller_1.getAllApply);
router.get('/getSingleApply', //get single user   
basicAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, validator_1.checkQuery)('_id'), apply_controller_1.getSingleApply);
router.delete('/', //delete Apply',
basicAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, validator_1.checkQuery)('_id'), apply_controller_1.deletedApply);
exports.default = router;
