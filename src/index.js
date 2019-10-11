const { connectToDB } = require('../config/connectDB');
const express = require('express');
const app = express();
const routeUsers =  require('./routes/users');
const routeTask = require('./routes/task')
connectToDB();

app.use(express.json());
app.use('/', routeUsers);
app.use('/', routeTask);

const port = process.env.PORT || 3000;
console.log(port);
app.listen(port);
