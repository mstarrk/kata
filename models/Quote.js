/* eslint-disable comma-dangle */

const { DataTypes } = require('sequelize');
const { Model } = require('sequelize');
const sequelize = require('../controllers/Database');

// extends

class Quote extends Model {}

Quote.init({
	// Model attributes are defined here
	text: {
		type: DataTypes.STRING(3000),
		allowNull: false
	},
	authorId: {
		type: DataTypes.BIGINT,
		allowNull: false
	},
	author: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	sequelize,
	modelName: 'Quote'
});

module.exports = Quote;
