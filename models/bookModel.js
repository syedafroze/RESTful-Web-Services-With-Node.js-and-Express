const mongoose = require("mongoose");

const { Schema } = mongoose;

const bookModel = new Schema({
  title: { type: String },
  author: { type: String },
});

module.exports=mongoose.model('Book',bookModel)