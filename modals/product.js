const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    ProductName: {
      type: String,
      required: true,
    },
    colors:[ {
      color: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      }],
    department: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isOnSale: {
      type: Boolean,
      required: true,
    },
    sale: {
      saleName: {
        type: String,
        default: "",
      },
      startDate: {
        type: Date,
        default: Date.now,
      },
      endDate: {
        type: Date,
        default: Date.now,
      },
      discountPercentage: {
        type: Number,
        default: 0,
      },
      salePrice: {
        type: Number,
        default: 0,
      },
      isOnline: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", ProductSchema);
