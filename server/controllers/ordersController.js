const Orders = require("../models/Orders.js");
const User = require("../models/User.js");

const placeOrder = async (req, res, next) => {
  try {
    const { products, location, totalAmount } = req.body;
    const userJWT = req.user;
    const user = await User.findById(userJWT.id);

    const order = new Orders({
      products: products,
      user: user._id,
      total_amount: totalAmount,
      location: location,
    });

    await order.save();
    user.orders.push(order.id);
    await user.save();
    return res
      .status(200)
      .json({ message: "Order placed successfully", order });
  } catch (err) {
    next(err);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Orders.findById(id);
    return res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Orders.find();
    return res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

const getOrdersByCustomer = async (req, res, next) => {
  try {
    const userJWT = req.user;
    const user = await User.findById(userJWT.id);

    const orders = user.orders;
    const orderPromises = orders.map((orderId) => Orders.findById(orderId));
    const ordersWithData = await Promise.all(orderPromises);

    return res.status(200).json(ordersWithData);
  } catch (err) {
    next(err);
  }
};

const getOrdersByChef = async (req, res, next) => {
  try {
    const userJWT = req.user;
    const orders = await Orders.find({ assigned: userJWT.id });
    return res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { id, status, assign } = req.body;
    const order = await Orders.findById(id);

    if (!order) {
      return next(404, "Food not found");
    }
    order.status = status;
    order.assigned = assign;
    await order.save();
    return res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  placeOrder,
  getOrder,
  getOrders,
  getOrdersByCustomer,
  getOrdersByChef,
  updateOrder,
};
