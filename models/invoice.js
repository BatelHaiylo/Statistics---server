const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    purchaser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    product: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
      }],
    cost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", InvoiceSchema);