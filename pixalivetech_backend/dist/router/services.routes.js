"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const services_controller_1 = require("../controller/services.controller");
const basicAuth_1 = require("../middleware/basicAuth");
const validator_1 = require("../middleware/validator");
const tokenManager_1 = require("../utils/tokenManager");
router.post('/', basicAuth_1.basicAuthUser, services_controller_1.saveServices);
router.get('/', basicAuth_1.basicAuthUser, services_controller_1.getServices);
router.get('/getSingleService', basicAuth_1.basicAuthUser, 
// checkSession,
(0, validator_1.checkQuery)('_id'), services_controller_1.getSingleServices);
router.put('/', basicAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, validator_1.checkRequestBodyParams)('_id'), services_controller_1.updateServices);
router.delete('/', basicAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, validator_1.checkQuery)('_id'), services_controller_1.deleteServices);
exports.default = router;
