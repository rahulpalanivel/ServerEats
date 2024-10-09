const displayError = require("../middleware/displayError.js");
const User = require("../models/User.js");

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userJWT = req.user;
    const user = await User.findById(userJWT.id);
    const existingCartItemIndex = user.cart.findIndex((item) =>
      item.product.equals(productId)
    );

    if (existingCartItemIndex !== -1) {
      // Product is already in the cart, update the quantity
      user.cart[existingCartItemIndex].quantity += quantity;
    } else {
      // Product is not in the cart, add it
      user.cart.push({ product: productId, quantity });
    }
    await user.save();
    return res
      .status(200)
      .json({ message: "Product added to cart successfully", user });
  } catch (err) {
    next(err);
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userJWT = req.user;
    const user = await User.findById(userJWT.id);
    if (!user) {
      return next(displayError(404, "User not found"));
    }
    const productIndex = user.cart.findIndex((item) =>
      item.product.equals(productId)
    );
    if (productIndex !== -1) {
      if (quantity && quantity > 0) {
        user.cart[productIndex].quantity -= quantity;
        if (user.cart[productIndex].quantity <= 0) {
          user.cart.splice(productIndex, 1); // Remove the product from the cart
        }
      } else {
        user.cart.splice(productIndex, 1);
      }

      await user.save();

      return res
        .status(200)
        .json({ message: "Product quantity updated in cart", user });
    } else {
      return next(displayError(404, "Product not found in the user's cart"));
    }
  } catch (err) {
    next(err);
  }
};

const removeAllFromCart = async (req, res, next) => {
  try {
    const userJWT = req.user;
    const user = await User.findById(userJWT.id);
    if (!user) {
      return next(displayError(404, "User not found"));
    }

    user.cart = [];

    await user.save();
    return res
      .status(200)
      .json({ message: "Product quantity updated in cart", user });
  } catch (err) {
    next(err);
  }
};

const getAllCartItems = async (req, res, next) => {
  try {
    const userJWT = req.user;
    const user = await User.findById(userJWT.id).populate({
      path: "cart.product",
      model: "Food",
    });
    const cartItems = user.cart;
    return res.status(200).json(cartItems);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  removeAllFromCart,
  getAllCartItems,
};
