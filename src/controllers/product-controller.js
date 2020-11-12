"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/product-repository");

exports.get = async (req, res, next) => {
  try {
    var data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição.",
    });
  }
};

exports.getBySlug = async (req, res, next) => {
  try {
    var data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição.",
    });
  }
};

exports.getById = async (req, res, next) => {
  try {
    var data = await repository.getById(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição.",
    });
  }
};

exports.getByTag = async (req, res, next) => {
  try {
    var data = await repository.getByTag(req.params.tag);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição.",
    });
  }
};

exports.post = async (req, res, next) => {
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

  try {
    await repository.create(req.body);
    res.status(201).send({ message: "Produto cadastrado com sucesso!!!" });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição.",
    });
  }
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

exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(200).send({
      message: "Produto atualizado com sucesso!",
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição.",
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.body.id);
    res.status(200).send({
      message: "Produto removido com sucesso!",
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição.",
    });
  }
};
