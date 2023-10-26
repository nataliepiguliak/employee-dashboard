const sequelize = require('../utils/database');
const { DataTypes } = require('sequelize');

const Company = sequelize.define('company', {
  companyCode: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Company;
