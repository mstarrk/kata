/* eslint-disable comma-dangle */

const { DataTypes } = require('sequelize');
const { Model } = require('sequelize');
const sequelize = require('../controllers/Database');

// extends

class Song extends Model {}


Song.init({
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
	},
	genre: {
		type: DataTypes.STRING
	},
	title: {
		type: DataTypes.STRING
	}
}, {
	sequelize,
	modelName: 'Song'
});

module.exports = Song;
