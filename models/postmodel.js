const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  desc: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  info: {
    required: false,
    type: String,
  },
});

module.exports = mongoose.model("postData", postSchema);
