const express = require('express');
const csv = require('fast-csv');
const { Readable } = require('stream');

const validate = require('./utils/validator');
const Industry = require('./models/industry');
const Company = require('./models/company');
const EmployeeDetail = require('./models/employeeDetail');

const router = express.Router();

router.post('/upload', async (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: 'file is not found' });
  }

 const file = req.files.file;
  const fileRows = [];
  const buffer = new Buffer.from(file.data, 'base64');
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);

  await readable
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => fileRows.push(row))
    .on('end', async _ => {
      const vr = validate(fileRows);

      if (vr && vr.length) {
        res.json(vr);
        return;
      }

      await EmployeeDetail.destroy({ truncate: { cascade: true } });
      await Company.destroy({ truncate: { cascade: true } });
      await Industry.destroy({ truncate: { cascade: true } });

      let uniqueIndustries = [...new Map(fileRows.map((item) => [item['Industry'], item])).values()];
      const industries = uniqueIndustries.map(r => {
        return {
          industryCode: r.Industry,
          companies: fileRows.filter(c => c.Industry === r.Industry).map(c => {
            return {
              companyCode: c.Company,
              employeeDetails: fileRows.filter(e => e.Company === c.Company).map(e => {
                return {
                  employeeId: e.Employee_ID,
                  workHours: e['Work Hours'],
                  vacationHours: e['Vacation Hours'],
                  overtimeHours: e['Overtime Hours'],
                };
              }),
            };
          }),
        };
      });

      await Promise.all(industries.map(async r => {
        await Industry.create(r,
          {
            include: [
              { model: Company, include: [EmployeeDetail] },
            ],
          });
      }));

      res.json([]);
    });
});

router.get('/dashboard', async (req, res) => {
  const result = await Industry.findAll({
    include: [
      { model: Company, include: [EmployeeDetail] },
    ],
    order: [['industryCode', 'ASC']],
  });

  const r = result.map(e => {
    const employeeCount = e.companies.map(c => c.employeeDetails.length).reduce((partialSum, a) => partialSum + +a, 0);

    return {
      industry: e.industryCode,
      averageWorkHours: e.companies.map(c => c.employeeDetails.map(c => c.workHours)).reduce((partialSum, a) => partialSum + +a, 0) / employeeCount,
      averageVacationHours: e.companies.map(c => c.employeeDetails.map(c => c.vacationHours)).reduce((partialSum, a) => partialSum + +a, 0) / employeeCount,
      averageOvertimeHours: e.companies.map(c => c.employeeDetails.map(c => c.overtimeHours)).reduce((partialSum, a) => partialSum + +a, 0) / employeeCount,
    };
  });

  res.json(r);
});

module.exports = router;