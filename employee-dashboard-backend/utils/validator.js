function validate(fileRows) {
  if (!fileRows || fileRows.length === 0) {
    return [
      'No data',
    ];
  }

  return fileRows.reduce((acc, v, i, arr) => {
    const employeeId = v['Employee_ID'];

    let vr = validatePositiveInteger(employeeId, 'Employee_ID', employeeId);
    if (vr) acc.push(vr);

    vr = validateMaxLength(employeeId, 'Company', v['Company'], 64);
    if (vr) acc.push(vr);

    vr = validateMaxLength(employeeId, 'Industry', v['Industry'], 64);
    if (vr) acc.push(vr);

    vr = validatePositiveInteger(employeeId, 'Work Hours', v['Work Hours']);
    if (vr) acc.push(vr);

    vr = validatePositiveInteger(employeeId, 'Vacation Hours', v['Vacation Hours']);
    if (vr) acc.push(vr);

    vr = validatePositiveInteger(employeeId, 'Overtime Hours', v['Overtime Hours']);
    if (vr) acc.push(vr);

    return acc;
  }, []);
}

function validatePositiveInteger(employeeId, columnName, value) {
  if (/^\+?([1-9]\d*)$/gm.test(value)) {
    return '';
  }

  return `Row ${employeeId}: ${columnName} must be a positive integer. Actual: ${value}.`;
}

function validateMaxLength(employeeId, columnName, value, maxLength) {
  if (value && value.length <= maxLength) {
    return '';
  }

  const s = maxLength === 1 ? '' : 's';
  return `Row ${employeeId}: ${columnName} must be maximum ${maxLength} character${s} long. Actual: ${value.length} character${s}.`;
}

module.exports = validate;