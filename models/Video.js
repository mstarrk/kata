/* eslint-disable comma-dangle */

const { DataTypes } = require('sequelize');
const { Model } = require('sequelize');
const sequelize = require('../controllers/Database');

// extends

class Video extends Model {}

Video.init({
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
	title: {
		type: DataTypes.STRING
	}
}, {
	sequelize,
	modelName: 'Video'
});

module.exports = Video;
