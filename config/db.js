const Sequelize = require('sequelize');

const db = new Sequelize('project_node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

module.exports = db;