const express = require('express')
const path = require('path')
const config = require('./config/config')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
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


app.get('/minima', (req, res) => {
  res.send('welcome to minima')
})

app.use('/minima', userRoutes);
app.use('/minima/posts', postRoutes);
app.get('*', function(req, res){
  res.status(404).send({error: 'page does not exist. Winter is Coming!!'});
});
app.listen(config.app.port, (req, res) => {
  console.log(`Server Is Live At Port ` + config.app.port)
})
