// require library
const mongoose = require('mongoose');
const { model } = require('../models/user');
const env = require('./environment');


// connect to the database
mongoose.connect(`mongodb://localhost/${env.db}`, {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
});


// acquire the connection (to check if it is successfull)
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'error in connecting the database'));

// up and running then print the message
db.once('open', function () {
    console.log('Successfully connected to the database');
})

module.exports = db;