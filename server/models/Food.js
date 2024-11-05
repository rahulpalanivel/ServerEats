const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      default: 0.0,
    },
    category: {
      type: [String],
      default: [],
    },
    ingredients: {
      type: [String],
      required: true,
    },
    time: {
      type: Number,
      default: 0,
    },
    availability: {
      type: String,
      default: "Yes",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", FoodSchema);
