const Sequelize = require('sequelize');
const db = require('../config/db');

const Ingredient = db.define('Ingredient', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true, 
        allowNull: false
    },
    // number: {
    //     type: Sequelize.INTEGER, 
    //     allowNull: false
    // },
    // unit: {
    //     type: Sequelize.INTEGER, 
    //     allowNull: false
    // },
    ingredient: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

module.exports = Ingredient