"use strict";

const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/customer-repository");

//encripitando a senha
//baixar dependência -> npm install md5 --save
const md5 = require("md5");
const authservice = require("../services/auth-service");
const emailService = require("../services/email-service.js");

exports.post = async (req, res, next) => {
  const valida = new ValidationContract();
  valida.hasMinLen(
    req.body.name,
    3,
    "O nome deve conter ao menos 3 caracteres."
  );
  valida.isEmail(req.body.email, 3, "E-mail inválido.");
  valida.hasMinLen(
    req.body.password,
    6,
    "A Senha deve conter ao menos 6 caracteres."
  );

  try {
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY), // encripitando a senha (gera um hash) + concatenando com um hash que criamos para dificultar a senha
    });

    emailService.send(
      req.body.email,
      "Bem vindo ao Node Store",
      global.EMAIL_TMPL.replace("{0}", req.body.name)
    );

    res.status(201).send({ message: "Cliente cadastrado com sucesso!!!" });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição.",
    });
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const customer = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY), // encripitando a senha (gera um hash) + concatenando com um hash que criamos para dificultar a senha
    });

    if (!customer) {
      res.status(404).send({
        message: "Usuário ou senha inválidos.",
      });
      return;
    }

    const token = await authservice.generationToken({
      email: customer.email,
      name: customer.name,
    });

    res.status(201).send({
      token: token,
      data: {
        email: customer.email,
        name: customer.name,
      },
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição.",
    });
  }
};
