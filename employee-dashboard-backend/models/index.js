const sequelize = require('../utils/database');

const Industry = require('./industry');
const Company = require('./company');
const EmployeeDetail = require('./employeeDetail');

function init() {
  Company.belongsTo(Industry);
  Industry.hasMany(Company);
  EmployeeDetail.belongsTo(Company);
  Company.hasMany(EmployeeDetail);
  
  sequelize.sync({ force: true });  
}

module.exports = { init };