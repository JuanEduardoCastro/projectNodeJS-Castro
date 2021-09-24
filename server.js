const express = require('express');
const router = require('./routes/index');
const session = require('express-session');
require('dotenv').config();
const Sequelize = require('sequelize');
const db = require('./config/db');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// db.define('Session', {
//     sid: {
//         type: Sequelize.STRING,
//         primaryKey: true,
//     },
//     id: Sequelize.STRING,
//     userName: Sequelize.STRING,
//     eMail: Sequelize.STRING,
//     photo: Sequelize.STRING,
//     expires: Sequelize.STRING,
//     data: Sequelize.STRING,
// })
// const extendDefaultFields = (defaults, session) => {
//     return {
//         data: defaults.data,
//         expires: defaults.expires,
//         id: session.userId,
//         userName: session.userName,
//         eMail: session.eMail,
//         photo: session.photo
//     }

// }
const dbStore = new SequelizeStore({
    db: db,
})
// const Recipe = require('./models/Recipe');
// const User = require('./models/User');
// const Ingredient = require('./models/Ingredient');
// const Step = require('./models/Step');

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

// //usuario tiene muchas recetas
// Recipe.belongsTo(User)
// User.hasMany(Recipe)

// //receta tiene muchos ingredientes
// Ingredient.belongsTo(Recipe)
// Recipe.hasMany(Ingredient)

// //receta tiene muchos pasos
// Step.belongsTo(Recipe)
// Recipe.hasMany(Step)

// //receta tiene muchsos likes de muchos usuarios
// //usuario tiene muchos likes a muchas recetas
// User.belongsToMany(Recipe, { through: 'likes' })
// Recipe.hasMany(Recipe, { through: 'likes' })

// //revisar ? ? 
// User.belongsToMany(Recipe, { through: 'comments' })
// Recipe.hasMany(Recipe, { through: 'comments' })

db.sync()
.then(() => {
    app.use('/', router);
    app.listen(process.env.PORT || 4000, process.env.HOST || '0.0.0.0', () => console.log('Server listening on port 4000'));
})
