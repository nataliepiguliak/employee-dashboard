const sequelize = require('../utils/database');
const { DataTypes } = require('sequelize');

const Industry = sequelize.define('industry', {
  industryCode: {
    type: DataTypes.STRING, //TODO max length
    allowNull: false,
    primaryKey: true,
  }
});

module.exports = Industry;