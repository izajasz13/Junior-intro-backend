const mongoose = require('mongoose');

async function connectToDB() {
    try {
        await mongoose.connect('mongodb+srv://rw-user:rw-user@juniorapp-xzjwz.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Connected to MongoDB...')
    } catch (err) {
        console.error('Connection failed...', err);
    }
}

module.exports.connectToDB = connectToDB;