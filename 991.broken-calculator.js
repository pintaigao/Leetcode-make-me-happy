/*
 * @lc app=leetcode id=991 lang=javascript
 *
 * [991] Broken Calculator
 */

// @lc code=start
/**
 * @param {number} startValue
 * @param {number} target
 * @return {number}
 */
var brokenCalc = function (startValue, target) {
  let ans = 0;
  while (target > startValue) {
    ans += 1;
    if (target % 2 == 1) target++;
    else target /= 2;
  }

  return ans + startValue - target;
};
// @lc code=end
