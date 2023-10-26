const sequelize = require('../utils/database');
const { DataTypes } = require('sequelize');

const EmployeeDetails = sequelize.define('employee_details', {
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

module.exports = EmployeeDetails;