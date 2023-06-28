const mongoose = require('mongoose');

module.exports=function(){
  mongoose
  .connect('mongodb://127.0.0.1:27017/bookDB')
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("could not connect"));
}

