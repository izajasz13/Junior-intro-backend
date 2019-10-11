const  express = require('express');
const { connectToDB } = require('../config/connectDB');
const app = express();
const route =  require('./routes/users');
const cors = require('cors');
connectToDB();

app.use(cors());
app.use(express.json());

app.use('/', route);
app.use('/section', require('./routes/section'));
app.use('/knowledge', require('./routes/knowledge'));

const port = process.env.PORT || 3000;
app.listen(port);
