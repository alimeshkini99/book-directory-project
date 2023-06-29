const router = require("express").Router();
const authorModel = require("../model/author_model");

router.get("/", async function (req, res) {
  const authorList = await authorModel.find();
  console.log(authorList);
  res.send(authorList);
});
router.get("/:id", async function (req, res) {
  const { id } = req.params;
  const author = await authorModel.find({ _id: id });
  if (!author) return res.send("author not found");
  res.send(author);
});

router.post("/", async function (req, res) {
  const name = req.body.name;
  const birthDate = req.body.birthDate;
  const email = req.body.email;
  const authorExist = await authorModel.findOne({ email: email });
  if(authorExist) return res.send('author exsit')

  var data = await authorModel.create({name,birthDate,email})
  data.save();

  res.send("author Uploaded");
});

router.put("/:email", async function (req, res) {
  const { email } = req.params;
  const { name, birthDate } = req.body;
  const authorExist = await authorModel.findOne({ email: email });
  if (!authorExist) return res.send("author do not exist");

  const updateField = (val, prev) => (!val ? prev : val);

  const updatedAuthor = {
    ...authorExist,
    name: updateField(name, authorExist.name),
    birthDate: updateField(birthDate, author.birthDate),
  };

  await authorModel.updateOne(
    { email: email },
    { $set: { name: updatedAuthor.name, birthDate: updatedAuthor.birthDate } }
  );
  res.status(200).send("Author updated");
});

router.delete("/:email", async function (req, res) {
  const { email } = req.params;

  const authorExist = await authorModel.findOne({ email: email });
  if (!authorExist) return res.send("author do not exist");

  await authorModel
    .deleteOne({ email: email })
    .then(function () {
      console.log("data deleted");
      res.send("author record deleted successully");
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports=router;
