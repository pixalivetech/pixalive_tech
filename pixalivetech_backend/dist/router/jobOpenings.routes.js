"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const jobOpenings_controller_1 = require("../controller/jobOpenings.controller");
const basicAuth_1 = require("../middleware/basicAuth");
const validator_1 = require("../middleware/validator");
const tokenManager_1 = require("../utils/tokenManager");
router.post('/', basicAuth_1.basicAuthUser, jobOpenings_controller_1.saveOpenings);
router.get('/', basicAuth_1.basicAuthUser, jobOpenings_controller_1.getOpenings);
router.get('/getSingleJobOpening', basicAuth_1.basicAuthUser, 
// checkSession,
(0, validator_1.checkQuery)('_id'), jobOpenings_controller_1.getSingleOpenings);
router.put('/', basicAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, validator_1.checkRequestBodyParams)('_id'), jobOpenings_controller_1.updateOpenings);
router.delete('/', basicAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, validator_1.checkQuery)('_id'), jobOpenings_controller_1.deleteOpenings);
exports.default = router;
