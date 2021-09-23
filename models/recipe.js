const Sequelize = require('sequelize');
const db = required('../config/db');

const Recipe = db.define('Recipe', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true, 
        allowNull: false
    },
    recipePhoto: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    recipeTitle: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    description: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    duration: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    rations: {
        type: Sequelize.STRING, 
        allowNull: false
    },
})

module.exports = Recipe;
