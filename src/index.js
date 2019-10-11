const { connectToDB } = require('../config/connectDB');
const express = require('express');
const app = express();
const route =  require('./routes/users');
connectToDB();

app.use(express.json());
app.use('/', route);

const port = process.env.PORT || 3000;
console.log(port);
app.listen(port);
