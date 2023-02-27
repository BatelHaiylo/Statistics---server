const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["admin", "manager", "employee", "user"],
      default: "user",
      required: true,
    },
    fullName: {
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
      min: '2005-12-31',
    },
    phone: {
      type: String,
      minLength: 10,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
