const Sequelize = require('sequelize');
const db = require('../config/db');

const User = db.define('User', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true, 
        allowNull: false
    },
    eMail: {
        type: Sequelize.STRING, 
        allowNull: false, 
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    photo: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    job: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    country: {
        type: Sequelize.STRING, 
        allowNull: false
    },
})

module.exports = User;