/* eslint-disable class-methods-use-this */
/* eslint-disable comma-dangle */

// Modules
require('dotenv').config();
const Sequelize = require('sequelize');

// DB

const host = process.env.DB_HOST_DEV;
const user = process.env.DB_USER_DEV;
const pwd = process.env.DB_PASSWORD_DEV;
const dbName = process.env.DB_NAME_DEV;

const sequelize = new Sequelize(dbName, user, pwd, {
	host,
	dialect: 'postgres'
});

module.exports = sequelize;
