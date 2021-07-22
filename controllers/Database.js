/* eslint-disable class-methods-use-this */
/* eslint-disable comma-dangle */

// Modules
require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres'
});

module.exports = sequelize;
