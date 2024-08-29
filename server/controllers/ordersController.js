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

const getAllOrders = async (req, res, next) => {
  try {
    const userJWT = req.user;
    const user = await User.findById(userJWT.id);
    const orders = user.orders;
    return res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

module.exports = { placeOrder, getAllOrders };
