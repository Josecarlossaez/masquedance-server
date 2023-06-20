// EXPRESS
const router = require("express").Router();

// USER IS LOGGED
const { isAuthenticated } = require("../middlewares/auth.middleware");

const Order = require("../models/Order.model");

const User = require("../models/User.model");

// * ORDER ROUTES *

// POST "/order/create" => Create new order
router.post("/create", isAuthenticated, async (req, res, next) => {
  const {
    username,
    email,
    orderCart,
    total,
    name,
    address,
    cp,
    town,
    province,
    country,
  } = req.body;


  const order = {
    username: username,
    email: email,
    orderCart: orderCart,
    total: total,
    name: name,
    address: address,
    cp: cp,
    town: town,
    province: province,
    country: country,
  };
 
  try {
    await Order.create(order);
    res.status(200).json("order created successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
