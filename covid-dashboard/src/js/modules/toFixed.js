// round float number to X digits after dot
export default (value, precisionVal) => {
  const precision = precisionVal || 0;
  const power = 10 ** precision;
  const absValue = Math.abs(Math.round(value * power));
  let result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));

  if (precision > 0) {
    const fraction = String(absValue % power);
    const padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
    result += `.${padding}${fraction}`;
  }
  return result;
};
