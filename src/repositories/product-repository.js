"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.get = () => {
  return Product.find(
    {
      active: true,
    },
    "title price slug"
  ); //o que mostrar no retorno
};

exports.getBySlug = (slug) => {
  return Product.findOne(
    {
      slug: slug,
      active: true,
    },
    "title description price slug tags"
  );
  //o que mostrar no retorno
};

exports.getById = (id) => {
  return Product.findById(id);
};

exports.getByTag = (tag) => {
  return Product.find(
    {
      tags: tag,
      active: true,
    },
    "title description price tags"
  );
};

exports.create = (data) => {
  // recomendável fazer assim
  //var product = new Product();
  //product.title =  req.body.title;
  //instanciando o Product
  var product = new Product(data);
  return product.save();
};

exports.update = (id, data) => {
  return Product.findByIdAndUpdate(id, {
    $set: {
      title: data.title,
      description: data.description,
      price: data.price,
    },
  });
};

exports.delete = (id) => {
  return Product.findOneAndRemove(id);
};
