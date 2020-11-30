const express = require('express');
const cookieParser = require('cookie-parser');
const env = require('./config/environment');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const flash = require('connect-flash');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoole = require('./config/passport-google-outh2-strategy');
const customMiddlewares = require('./config/middlewares');

const MongoStore = require('connect-mongo')(session);
const expressEjsLayouts = require('express-ejs-layouts');

app.use(express.static(env.asset_path));

app.use(expressEjsLayouts);
//  extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.urlencoded());

app.use(cookieParser());



// app.use(expressLayouts);
// // extract style and scripts from sub pages into the layout
// app.set('layout extractStyles', true);
// app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'nodejs_authentication',
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'

        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(customMiddlewares.setFlash);

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));


app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
