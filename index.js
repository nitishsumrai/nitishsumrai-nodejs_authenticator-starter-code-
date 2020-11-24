const express = require('express');
const port = 8000;
const app = express();
const db = require('./config/mongoose');
const cookirParser = require('cookie-parser');

// middlewares 
app.use(express.static('assets'));
app.use(express.urlencoded({ extended: true }));
app.use(cookirParser());

// use express router
app.use('/', require('./routes/index'))

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function (err) {
    if (err) {
        console.log('server is not running');
    }
    console.log('server is up and running on port:', port);
});