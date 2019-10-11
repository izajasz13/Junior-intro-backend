const  express = require('express');
const { connectToDB } = require('../config/connectDB');
const express = require('express');
const app = express();
const route =  require('./routes/users');
connectToDB();

app.use(express.json());

app.use('/', route);
app.use('/section', require('./routes/section'));

const port = process.env.PORT || 3000;
app.listen(port, "Listening on port: " + port);
