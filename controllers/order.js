const {ProductCart, Order} = require("../models/order");

//params
exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Order NOT FOUND",
        });
      }
      req.order = order;
      next();
    });
};

//create
exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save order",
      });
    }
  });
};

// ReadAll
exports.getAllProducts = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "Orders NOT FOUND",
        });
      }
      res.json(orders);
    });
};

// Read
exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

// update
exports.updateOrderStatus = (req, res) => {
  Order.findByIdAndUpdate(
    {_id: req.body.orderId},
    {$set: {staus: req.body.status}},
    (err, updatedStatus) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update status",
        });
      }
      res.json(updatedStatus);
    }
  );
};
