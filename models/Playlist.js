/* eslint-disable comma-dangle */

/* eslint-disable comma-dangle */

const { DataTypes } = require('sequelize');
const { Model } = require('sequelize');
const sequelize = require('../controllers/Database');

// extends

class Playlist extends Model {}

Playlist.init({
	// Model attributes are defined here
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	authorId: {
		type: DataTypes.BIGINT,
		allowNull: false
	}
}, {
	sequelize,
	modelName: 'Playlist'
});

module.exports = Playlist;