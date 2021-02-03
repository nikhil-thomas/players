const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    fName: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 3,
    },
    lName: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 1,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 10,
    },
    password: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 8,
    },
    userType: {
      type: Number,
      required: true,
      unique: false,
      trim: true,
      minlength: 1,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
