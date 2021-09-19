const express = require('express');
const router = require('./routes/index');
const session = require('express-session');
const mongo = require('connect-mongodb-session')(session);
require('dotenv').config();

const store = new mongo({
    uri: process.env.MONGODB,
    collection: 'sessions',
})
const passport = require('passport');
require('./config/database');
require('./config/passport');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: false,
    store: store
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

app.listen(process.env.PORT || 4000, process.env.HOST || '0.0.0.0', () => console.log('Server listening on port 4000'));