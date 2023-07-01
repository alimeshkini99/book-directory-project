const router = require("express").Router();
const authorModel = require("../model/author_model");
const bookModel = require("../model/book_model");



router.get('/?title=',async function (req,res){
  let name = req.query.name;

  const author = await authorModel.find({ name: name });
  if (!author) return res.send("author not found");

  res.send(author)
  
})
router.get('/?name=',async function (req,res){
  
  let title = req.query.title;

  const book = await bookModel.findOne({ title: title });
  if (!book) return res.send("book not found");

  res.send(book);
  
})

module.exports=router;
