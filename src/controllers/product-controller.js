"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/product-repository");

exports.get = (req, res, next) => {
  repository
    .get()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getBySlug = (req, res, next) => {
  repository
    .getBySlug(req.params.slug)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getById = (req, res, next) => {
  repository
    .getById(req.params.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getByTag = (req, res, next) => {
  repository.getByTag
    .getByTag(req.params.tag)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.post = (req, res, next) => {
  const valida = new ValidationContract();
  valida.hasMinLen(
    req.body.title,
    3,
    "O título deve conter ao menos 3 caracteres."
  );
  valida.hasMinLen(
    req.body.slug,
    3,
    "O slug deve conter ao menos 3 caracteres."
  );
  valida.hasMinLen(
    req.body.description,
    3,
    "A Descrição deve conter ao menos 3 caracteres."
  );

  repository
    .create(req.body)
    .then((x) => {
      res.status(201).send({
        message: "Produto cadastrado com sucesso!!!",
      }); // req.bodypegando o corpo da requisição
    }) // arrow function
    .catch((e) => {
      res.status(400).send({
        message: "Falha ao cadatrar o Produto ",
        data: e,
      });
    });
};

/*
exports.put = (req, res, next) => {
  let id = req.params.id; 
  res.status(201).send({
    id: id,
    item: req.body,
  }); //pegando o corpo da requisição
};
*/

exports.put = (req, res, next) => {
  repository
    .update(req.params.id, req.body)
    .then((x) => {
      res.status(200).send({
        message: "Produto atualizado com sucesso!",
      });
    })
    .catch((e) => {
      res.status(400).send({
        message: "Falha ao atualizar o produto!",
        data: e,
      });
    });
};

exports.delete = (req, res, next) => {
  repository
    .delete(req.body.id)
    .then((x) => {
      res.status(200).send({
        message: "Produto removido com sucesso!",
      });
    })
    .catch((e) => {
      res.status(400).send({
        message: "Falha ao remover o produto!",
        data: e,
      });
    });
};
