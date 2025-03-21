// app.js 

const express = require('express')
const app = express()

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

app.use(bodyParser.json())
 
const postsRoute = require('./routes/posts')
const authRoute = require('./routes/auth')

app.use('/api/posts', postsRoute) // api 'posts' is mapped to the posts route 
app.use('/api/user', authRoute)

const MURL = process.env.DB_CONNECTOR;

mongoose.connect(MURL)
    .then(() => console.log('MongoDB connector is on'))
    .catch(err => console.error(err));

app.listen(3000, () => {
    console.log("Server is running");
});
