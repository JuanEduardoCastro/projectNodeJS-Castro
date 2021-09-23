const Sequelize = require('sequelize');
const db = require('../config/db');

const Ingredient = db.define('Ingredient', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true, 
        allowNull: false
    },
    ingrediente: {
        type: Sequelize.STRING,
        allowNull: false
    },
    number: {
        type: Sequelize.INTEGER, 
        allowNull: false
    },
    unit: {
        typ: Sequelize.INTEGER, 
        allowNull: false
    }
})

module.exports = Ingredient