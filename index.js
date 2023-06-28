const express = require('express')
const bodyParser = require('body-parser')
const book = require('./routes/book')
const author = require('./routes/author')
const app = express()
const port = 3000;
require('./config/db')()



app.use(bodyParser.json())
app.use('/',book)
app.use('/',author)

app.listen(port,()=>console.log(`app listening on port ${port}`))