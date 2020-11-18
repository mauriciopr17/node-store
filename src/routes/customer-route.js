"use strict";

// require -> importar pacotes
const express = require("express");
const router = express.Router(); // arquivo de rotas
const controller = require("../controllers/customer-controller");

router.post("/", controller.post);
router.post("/authenticate", controller.authenticate);

module.exports = router;
