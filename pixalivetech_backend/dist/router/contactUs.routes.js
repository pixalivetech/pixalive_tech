"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const contactUs_controller_1 = require("../controller/contactUs.controller");
const basicAuth_1 = require("../middleware/basicAuth");
const validator_1 = require("../middleware/validator");
const tokenManager_1 = require("../utils/tokenManager");
router.post('/', //save contact  // without checking session
basicAuth_1.basicAuthUser, contactUs_controller_1.saveContact);
router.get('/', //get all contact   
basicAuth_1.basicAuthUser, tokenManager_1.checkSession, contactUs_controller_1.getAllUser);
router.get('/getSingleUser', //get single user   
basicAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, validator_1.checkQuery)('_id'), contactUs_controller_1.getSingleUsers);
router.delete('/', //delete users',
basicAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, validator_1.checkQuery)('_id'), contactUs_controller_1.deletedUsers);
exports.default = router;
