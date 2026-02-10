/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  const n = digits.length;
  for (let i = n - 1; i >= 0; --i) {
    if (digits[i] !== 9) {
      digits[i] += 1;
      for (let j = i + 1; j < n; ++j) {
        digits[j] = 0;
      }
      return digits;
    }
  }

  // digits 中所有的元素均为 9
  const ans = new Array(n + 1).fill(0);
  ans[0] = 1;
  return ans;
};