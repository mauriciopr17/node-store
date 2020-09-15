"use strict";

// require -> importar pacotes
const express = require("express");
// converter o retorno das requests em json
const bodyParser = require("body-parser");
const app = express();
const router = express.Router(); // arquivo de rotas

//carrega rotas
const indexRoute = require("./routes/index-route");
const productRoute = require("./routes/products-route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", indexRoute);
app.use("/products", productRoute);

// com isso podemos 'importar" esse arquivo para uso nos outros lugares do projeto
module.exports = app;
