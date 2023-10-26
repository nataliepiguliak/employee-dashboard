const sequelize = require('../utils/database');
const { DataTypes } = require('sequelize');

const EmployeeDetail = sequelize.define('employeeDetail', {
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  workHours: {
    type: DataTypes.INTEGER
  },
  vacationHours: {
    type: DataTypes.INTEGER
  },
  overtimeHours: {
    type: DataTypes.INTEGER
  }
});

module.exports = EmployeeDetail;