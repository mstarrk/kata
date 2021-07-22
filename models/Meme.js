/* eslint-disable comma-dangle */

const { DataTypes } = require('sequelize');
const { Model } = require('sequelize');
const sequelize = require('../controllers/Database');

// extends

class Meme extends Model {}

Meme.init({
	// Model attributes are defined here
	url: {
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
	modelName: 'Meme'
});

module.exports = Meme;
