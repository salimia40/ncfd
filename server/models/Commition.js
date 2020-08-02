const { Schema, model } = require("mongoose");

const CommitionSchema = new Schema({
  payeer: {
    type: String,
    required: true
  },
  referer: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    default: 0,
  },
  profit: {
    type: Number,
    default: 0,
  }
});

const Commition = model("Commition", CommitionSchema);

module.exports = Commition;