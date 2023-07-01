const mongoose = require("mongoose");

const bookModel = new mongoose.Schema({
  title: { type: String, required:'{PATH} is required ',lowercase: true, },
  isbn: { type: Number,required:true,unique:true},
  About:{type:String},
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref:'author'
  }
},{
  timestamps:true
});

 

module.exports = mongoose.model('books',bookModel);
