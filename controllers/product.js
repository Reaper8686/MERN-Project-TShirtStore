const Product = require("../models/product");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

//parmas
exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "product NOT FOUND",
        });
      }
      req.product = product;
      next();
    });
};

//create
exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtentsions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem in image",
      });
    }
    //Validation on fields

    const {name, description, price, categoryid, stock} = fields;

    if (!name || !description || !price || !categoryid || !stock) {
      return res.status(400).json({
        error: "Enter fields properly",
      });
    }

    //creating product object
    let product = new Product(fields);

    if (!file.photo) {
      return res.status(400).json({
        error: "photo is required",
      });
    }

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size to big",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //saving data to DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to save product",
        });
      }
      // console.log(product);
      res.json(product);
    });
  });
};

//read
exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

//update
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtentsions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem in image",
      });
    }

    //creating product object
    let product = req.product;
    product = _.extend(product, fields);

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size to big",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //saving data to DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update product",
        });
      }
      // console.log(product);
      res.json(product);
    });
  });
};

//delete
exports.removeProduct = (req, res) => {
  let product = req.product;
  product.remove((err, removedProduct) => {
    if (err) {
      return res.status(400).json({
        error: `Failed to delete ${removedProduct.name} product`,
      });
    }
    res.json({
      message: `Succesfull to remove ${removedProduct.name} product `,
    });
  });
};

//getAll
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .populate("category")
    .select("-photo")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "products NOT FOUND",
        });
      }
      res.json(products);
    });
};

//middlewares
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.updateStock = (req, res, next) => {
  let myOperation = req.body.order.products.map((product) => {
    return {
      updateOne: {
        filter: {_id: product._id},
        update: {$inc: {stock: -product.count, sold: +product.count}},
      },
    };
  });
  Product.bulkWrite(myOperation, {}, (err, bulkOperation) => {
    if (err) {
      return res.status(400).json({
        error: "bulkwrite operation failed",
      });
    }
    next();
  });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "categories NOT FOUND",
      });
    }
    res.json(categories);
  });
};
