const mongoose = require("mongoose");
const Food = require("../models/Food.js");
const displayError = require("../middleware/displayError.js");

const addProducts = async (req, res, next) => {
  try {
    const foodData = req.body;
    if (!Array.isArray(foodData)) {
      return next(
        displayError(400, "Invalid request. Expected an array of foods.")
      );
    }
    let createdfoods = [];
    for (const foodInfo of foodData) {
      const { name, desc, img, price, ingredients, category } = foodInfo;
      const product = new Food({
        name,
        desc,
        img,
        price,
        ingredients,
        category,
      });
      const createdFoods = await product.save();
      createdfoods.push(createdFoods);
    }
    return res
      .status(201)
      .json({ message: "Products added successfully", createdfoods });
  } catch (err) {
    next(err);
  }
};

const getFoodItems = async (req, res, next) => {
  try {
    let { categories, minPrice, maxPrice, ingredients, search } = req.query;
    ingredients = ingredients?.split(",");
    categories = categories?.split(",");

    const filter = {};
    if (categories && Array.isArray(categories)) {
      filter.category = { $in: categories }; // Match products in any of the specified categories
    }
    if (ingredients && Array.isArray(ingredients)) {
      filter.ingredients = { $in: ingredients }; // Match products in any of the specified ingredients
    }
    if (maxPrice || minPrice) {
      filter["price"] = {};
      if (minPrice) {
        filter["price"]["$gte"] = parseFloat(minPrice);
      }
      if (maxPrice) {
        filter["price"]["$lte"] = parseFloat(maxPrice);
      }
    }
    if (search) {
      filter.$or = [
        { title: { $regex: new RegExp(search, "i") } }, // Case-insensitive title search
        { desc: { $regex: new RegExp(search, "i") } }, // Case-insensitive description search
      ];
    }
    const foodList = await Food.find(filter);

    return res.status(200).json(foodList);
  } catch (err) {
    next(err);
  }
};

const getFoodById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return next(displayError(400, "Invalid product ID"));
    }
    const food = await Food.findById(id);
    if (!food) {
      return next(displayError(404, "Food not found"));
    }
    return res.status(200).json(food);
  } catch (err) {
    next(err);
  }
};

module.exports = { addProducts, getFoodItems, getFoodById };
