const mongoose = require("mongoose");

const ImporterSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      minLength: 11,
      required: true,
      unique: true,
    },
    age: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      minLength: 10,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    importerCode: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("importer", ImporterSchema);
