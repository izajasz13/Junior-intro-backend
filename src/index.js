const express = require('express');
const { connectToDB } = require('../config/connectDB');
const app = express();
<<<<<<< HEAD
const routeUsers =  require('./routes/users');
const routeTask = require('./routes/task')
=======
const route =  require('./routes/users');
const cors = require('cors');
>>>>>>> b8ab685c625ba447cac9ad5bade1bed91f7af7e5
connectToDB();

app.use(cors());
app.use(express.json());
<<<<<<< HEAD
app.use('/', routeUsers);
app.use('/', routeTask);
=======

app.use('/', route);
app.use('/section', require('./routes/section'));
app.use('/knowledge', require('./routes/knowledge'));
>>>>>>> b8ab685c625ba447cac9ad5bade1bed91f7af7e5

const port = process.env.PORT || 3000;
console.log("Listening on port: " + port);
app.listen(port);
