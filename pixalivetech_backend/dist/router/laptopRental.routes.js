"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const laptopRental_controller_1 = require("../controller/laptopRental.controller");
const basicAuth_1 = require("../middleware/basicAuth");
const validator_1 = require("../middleware/validator");
const tokenManager_1 = require("../utils/tokenManager");
router.post('/', //save contact  // without checking session
basicAuth_1.basicAuthUser, laptopRental_controller_1.saveLaptopRental);
router.get('/', //get all contact   
basicAuth_1.basicAuthUser, laptopRental_controller_1.getLaptopRental);
router.get('/getSingleRental', //get single user   
basicAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, validator_1.checkQuery)('_id'), laptopRental_controller_1.getSingleLaptopRental);
router.put('/', //update user   
basicAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, validator_1.checkRequestBodyParams)('_id'), laptopRental_controller_1.updateLaptopRental);
router.delete('/', //delete users',
basicAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, validator_1.checkQuery)('_id'), laptopRental_controller_1.deleteLaptopRental);
exports.default = router;
