"use strict";

const express = require("express");
const router = express.Router(); // arquivo de rotas
const controller = require("../controllers/order-controller");
const { authenticate } = require("../repositories/customer-repository");
const authservice = require("../services/auth-service");

router.get("/", authservice.authorize, controller.get);
router.post("/", authservice.authorize, controller.post);

module.exports = router;
