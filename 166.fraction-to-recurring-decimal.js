/*
 * @lc app=leetcode id=166 lang=javascript
 *
 * [166] Fraction to Recurring Decimal
 */
/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */
function fractionToDecimal(numerator, denominator) {
  if (numerator === 0) return '0';
  let res = '';

  if (Math.sign(numerator) !== Math.sign(denominator)) res += '-';

  let n = Math.abs(numerator);
  const d = Math.abs(denominator);

  res += Math.floor(n / d);
  n %= d;

  if (n === 0) return res;

  res += '.';

  let map = {};

  while (n !== 0) {
    map[n] = res.length;

    n *= 10;
    res += Math.floor(n / d);
    n %= d;

    const i = map[n]; // repeat starting index
    if (i !== undefined) return `${res.substr(0, i)}(${res.substr(i)})`;
  }

  return res;
}

