const mongoose = require("mongoose");

const authorModel = new mongoose.Schema({
  name: { type: String, required:true,lowercase: true, },
  birthDate: { type: Number},
  email:{type:String,required:true,unique:true,lowercase: true,}
},{
  timestamps:true
});

 

module.exports = mongoose.model('authors',authorModel);
