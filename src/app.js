"use strict";

// require -> importar pacotes
const express = require("express");
// converter o retorno das requests em json
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config.js");
const app = express();
const router = express.Router(); // arquivo de rotas

//balta.io
mongoose.connect(config.connectionString);

//carregando os Models
const Product = require("./models/product");
const Customer = require("./models/customer");
const Order = require("./models/order");

//carrega rotas
const indexRoute = require("./routes/index-route");
const productRoute = require("./routes/products-route");
const customerRoute = require("./routes/customer-route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", indexRoute);
app.use("/products", productRoute);
app.use("/customers", customerRoute);

// com isso podemos 'importar" esse arquivo para uso nos outros lugares do projeto
module.exports = app;
