/* eslint-disable class-methods-use-this */
/* eslint-disable comma-dangle */

// Modules
require('dotenv').config();
const Sequelize = require('sequelize');

// DB

const host = process.env.DB_HOST_PROD;
const user = process.env.DB_USER_PROD;
const pwd = process.env.DB_PASSWORD_PROD;
const dbName = process.env.DB_NAME_PROD;

const sequelize = new Sequelize(dbName, user, pwd, {
	host,
	dialect: 'postgres'
});

module.exports = sequelize;
