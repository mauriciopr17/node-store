"use strict";

// require -> importar pacotes
const express = require("express");
// converter o retorno das requests em json
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const router = express.Router(); // arquivo de rotas

//balta.io
mongoose.connect(
  "mongodb+srv://pereira:pereira@cluster0.eui4y.mongodb.net/Store-Node-Baltaio?retryWrites=true&w=majority"
);

//carregando os Models
const Product = require("./models/product");

//carrega rotas
const indexRoute = require("./routes/index-route");
const productRoute = require("./routes/products-route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", indexRoute);
app.use("/products", productRoute);

// com isso podemos 'importar" esse arquivo para uso nos outros lugares do projeto
module.exports = app;
