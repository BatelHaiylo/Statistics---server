const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    ProductName: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    department: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    isOnSale: {
      type: Boolean,
      required: true,
    },
    sale: {
      saleName: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      discountPercentage: { type: Number },
      salePrice: { type: Number },
      isOnline: { type: Boolean },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('product', ProductSchema);