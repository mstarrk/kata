/* eslint-disable class-methods-use-this */
/* eslint-disable comma-dangle */

// Modules
require('dotenv').config();
const Sequelize = require('sequelize');

console.log('ENV DB details: '+ process.env.DATABASE_URL);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres',
	dialectOptions: {
		ssl: {
		  require: true,
		  rejectUnauthorized: false
	  }
	}
});

module.exports = sequelize;
