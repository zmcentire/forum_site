const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require("path")
require("dotenv").config();
const port = process.env.PORT || 8000;


app.use(express.json())
app.use('/topics', require('./routes/topicRouter'))
app.use('/Posts', require('./routes/postRouter'))
app.use('/comments', require('./routes/commentRouter'))
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*'); // * => allow all origins
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Accept'); // add remove headers according to your needs
//   next()
// })
app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/forum',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log('MongoDB is connected')
    })
    .catch(err => {
        console.log(err)
    })

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
});
