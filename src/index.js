const  express = require('express');
const { connectToDB } = require('../config/connectDB');

connectToDB();



const app = express();

app.use(express.json());

app.use('/section', require('./routes/section'));

const port = process.env.PORT || 3000;
app.listen(port);
