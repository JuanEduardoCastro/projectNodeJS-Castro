const express = require('express');
const router = require('./routes/index');
const session = require('express-session');
require('dotenv').config();
require('./config/database');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: false
}))

app.use('/', router);

app.listen(4000, ()=>console.log('Server listening on port 4000'));