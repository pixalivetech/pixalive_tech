"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const hireDevelopers_controller_1 = require("../controller/hireDevelopers.controller");
const basicAuth_1 = require("../middleware/basicAuth");
const validator_1 = require("../middleware/validator");
const tokenManager_1 = require("../utils/tokenManager");
router.post('/', basicAuth_1.basicAuthUser, hireDevelopers_controller_1.saveDevelopers);
router.get('/', basicAuth_1.basicAuthUser, hireDevelopers_controller_1.getDevelopers);
router.get('/getSingleDeveloper', basicAuth_1.basicAuthUser, 
// checkSession,
(0, validator_1.checkQuery)('_id'), hireDevelopers_controller_1.getSingleDevelopers);
router.put('/', basicAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, validator_1.checkRequestBodyParams)('_id'), hireDevelopers_controller_1.updateDevelopers);
router.delete('/', basicAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, validator_1.checkQuery)('_id'), hireDevelopers_controller_1.deleteDevelopers);
exports.default = router;
