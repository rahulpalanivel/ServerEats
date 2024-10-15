const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    total_amount: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Order-Pending",
      // [Order pending, preparing, delivered]
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food",
            required: true,
          },
          quantity: { type: Number, default: 1 },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", OrderSchema);
