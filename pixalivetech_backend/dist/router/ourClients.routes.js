"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const ourClients_controller_1 = require("../controller/ourClients.controller");
const basicAuth_1 = require("../middleware/basicAuth");
const validator_1 = require("../middleware/validator");
const tokenManager_1 = require("../utils/tokenManager");
router.post('/', //save contact  // without checking session
basicAuth_1.basicAuthUser, ourClients_controller_1.saveOurClients);
router.get('/', //get all contact   
basicAuth_1.basicAuthUser, ourClients_controller_1.getOurClients);
router.get('/getSingleClient', //get single user   
basicAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, validator_1.checkQuery)('_id'), ourClients_controller_1.getSingleOurClients);
router.put('/', //update user   
basicAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, validator_1.checkRequestBodyParams)('_id'), ourClients_controller_1.updateOurClients);
router.delete('/', //delete users',
basicAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, validator_1.checkQuery)('_id'), ourClients_controller_1.deleteOurClients);
exports.default = router;
