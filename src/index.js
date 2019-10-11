const express = require('express');
const { connectToDB } = require('../config/connectDB');
const app = express();
const route =  require('./routes/users');
connectToDB();

app.use(express.json());

app.use('/', route);
app.use('/section', require('./routes/section'));

const port = process.env.PORT || 3000;
console.log("Listening on port: " + port);
app.listen(port);
