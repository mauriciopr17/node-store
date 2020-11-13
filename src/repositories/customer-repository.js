"use strict";

const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");

exports.create = async (data) => {
  // recomendável fazer assim
  //var product = new Product();
  //product.title =  req.body.title;
  //instanciando o Product
  var customer = new Customer(data);
  await customer.save();
};
