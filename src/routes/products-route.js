"use strict";

// require -> importar pacotes
const express = require("express");
const router = express.Router(); // arquivo de rotas

router.post("/", (req, res, next) => {
  res.status(201).send(req.body); //pegando o corpo da requisição
});

router.put("/:id", (req, res, next) => {
  let id = req.params.id;
  res.status(201).send({
    id: id,
    item: req.body,
  }); //pegando o corpo da requisição
});

router.delete("/", (req, res, next) => {
  res.status(200).send(req.body); //pegando o corpo da requisição
});

module.exports = router;
