const { DataTypes } = require('sequelize');
const sequelizeInstance = require('../libs/common/connect');
const Food = require('./food');
const User = require('./user');

const Wishlist = sequelizeInstance.define(
    'Wishlist',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    }
);

module.exports = Wishlist;
