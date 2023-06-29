const router = require("express").Router();
const bookModel = require("../model/book_model");

router.get("/books", async function (req, res) {
  const bookList = await bookModel.find();
  console.log(bookList);
  res.send(bookList);
});
router.get("/books/:id", async function (req, res) {
  const { id } = req.params;
  const book = await bookModel.findOne({ isbn: id });
  if (!book) return res.send("book not found");
  res.send(book);
});

router.post("/books", async function (req, res) {
  const title = req.body.title;
  const isbn = req.body.isbn;
  const author = req.body.author;
  const bookExist = await bookModel.findOne({ isbn: isbn });
  if(bookExist) return res.send('book already exsit')

  var data = await bookModel.create({title,isbn,author})
  data.save();

  res.send("book Uploaded");
});

router.put("/books/:id", async function (req, res) {
  const { id } = req.params;
  const { title, author } = req.body;
  const bookExist = await bookModel.findOne({ isbn: id });
  if (!bookExist) return res.send("book do not exist");

  const updateField = (val, prev) => (!val ? prev : val);

  const updatedBook = {
    ...bookExist,
    title: updateField(title, bookExist.title),
    author: updateField(author, bookExist.author),
  };

  await bookModel.updateOne(
    { isbn: id },
    { $set: { title: updatedBook.title, author: updatedBook.author } }
  );
  res.status(200).send("book updated");
});

router.delete("/books/:id", async function (req, res) {
  const { id } = req.params;

  const bookExist = await bookModel.findOne({ isbn: id });
  if (!bookExist) return res.send("book do not exist");

  await bookModel
    .deleteOne({ isbn: id })
    .then(function () {
      console.log("data deleted");
      res.send("book record deleted successully");
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports=router;
