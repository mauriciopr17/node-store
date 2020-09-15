"use strict";

// require -> importar pacotes
const express = require("express");
const router = express.Router(); // arquivo de rotas

router.get("/", (req, res, next) => {
  res.status(200).send({
    title: "Node Store API",
    version: "0.0.2",
  });
});

module.exports = router;
