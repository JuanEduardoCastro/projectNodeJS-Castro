const Sequelize = require('sequelize');
const db = require('../config/db');

const Step = db.define('Step', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true, 
        allowNull: false
    },
    step: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

module.exports = Step;