const express = require('express');
const { connectToDB } = require('../config/connectDB');
const app = express();
const routeUsers =  require('./routes/users');
const routeTask = require('./routes/task')
const cors = require('cors');

connectToDB();

app.use(cors());
app.use(express.json());
app.use('/', routeUsers);
app.use('/', routeTask);
app.use('/section', require('./routes/section'));
app.use('/knowledge', require('./routes/knowledge'));

const port = process.env.PORT || 3000;
console.log("Listening on port: " + port);
app.listen(port);
