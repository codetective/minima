const express = require('express')
const path = require('path')
const config = require('./config/config')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes');
const app = express()
require("dotenv").config();

//Configuring Express
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//Configure MongoDB Database
mongoose.connect(process.env.CLOUD_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(response => {
    console.log('MongoDB Database Running Successfully')
  })
  .catch(err => {
    console.log(err)
  });



app.get('/api/v1', (req, res) => {
  res.send('welcome to minima')
})

app.use('/api/v1/', userRoutes);

app.listen(config.app.port, (req, res) => {
  console.log(`Server Is Live At Port ` + config.app.port)
})
