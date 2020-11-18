"use strict";

// require -> importar pacotes
const express = require("express");
const router = express.Router(); // arquivo de rotas
const controller = require("../controllers/product-controller");
const authservice = require("../services/auth-service");

router.get("/", controller.get);
router.get("/:slug", controller.getBySlug);
router.get("/admin/:id", controller.getById);
router.get("/tags/:tag", controller.getByTag);
//authservice.authorize -> indica que se posso fazer um post se estiver logado
router.post("/", authservice.authorize, controller.post);
router.put("/:id", authservice.authorize, controller.put);
router.delete("/:id", authservice.authorize, controller.delete);

module.exports = router;
