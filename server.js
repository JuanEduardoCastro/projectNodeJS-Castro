const express = require('express');
const router = require('./routes/index');
const session = require('express-session');
require('dotenv').config();
const Sequelize = require('sequelize');
const db = require('./config/db');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({
    db: db,
})
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const Ingredient = require('./models/Ingredient');
const Step = require('./models/Step');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: false,
    store: dbStore,
}));

//recipe-user
Recipe.belongsTo(User)
User.hasMany(Recipe)

//ingredient-recipe, ingredient-user
Ingredient.belongsTo(Recipe)
Recipe.hasMany(Ingredient)

Ingredient.belongsTo(User)
User.hasMany(Ingredient)

//step-recipe, step-user
Step.belongsTo(Recipe)
Recipe.hasMany(Step)

Step.belongsTo(User)
User.hasMany(Step)

db.sync()
.then(() => {
    app.use('/', router);
    app.listen(process.env.PORT || 4000, process.env.HOST || '0.0.0.0', () => console.log('Server listening on port 4000'));
})
