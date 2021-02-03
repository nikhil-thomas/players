const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playerSchema = new Schema(
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
    age: {
      type: Number,
      required: true,
      unique: false,
      trim: true,
      minlength: 1,
    },
    position: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 2,
    },
    goals: {
      type: Number,
      required: false,
      unique: false,
      trim: true,
      minlength: 1,
    },
    assists: {
      type: Number,
      required: false,
      unique: false,
      trim: true,
      minlength: 1,
    },
    saves: {
      type: Number,
      required: false,
      unique: false,
      trim: true,
      minlength: 1,
    },
    cleanSheet: {
      type: Number,
      required: false,
      unique: false,
      trim: true,
      minlength: 1,
    },
    matches: {
      type: Number,
      required: false,
      unique: false,
      trim: true,
      minlength: 1,
    },
    salary: {
      type: Number,
      required: false,
      unique: false,
      trim: true,
      minlength: 1,
    },
    price: {
      type: Number,
      required: false,
      unique: false,
      trim: true,
      minlength: 1,
    },
    offers: [{ 
        id: {
          type: Number,
          required: false,
          unique: false,
          trim: true,
          minlength: 1,
        },
        salary: {
          type: Number,
          required: false,
          unique: false,
          trim: true,
          minlength: 1,
        },
        price: {
          type: Number,
          required: false,
          unique: false,
          trim: true,
          minlength: 1,
        },
        club: {
          type: String,
          required: false,
          unique: false,
          trim: true,
          minlength: 1,
        } ,
        description: {
          type: String,
          required: false,
          unique: false,
          trim: true,
          minlength: 1,
        },
        accepted: {
          type: Boolean,
          required: false,
          unique: false,
          trim: true,
          minlength: 1,
      }  
    }],
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
