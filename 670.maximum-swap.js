/*
 * @lc app=leetcode id=670 lang=javascript
 *
 * [670] Maximum Swap
 */

// @lc code=start
/**
 * @param {number} num
 * @return {number}
 */
var maximumSwap = function (num) {
  let digits = (num + "").split("");

  let buckets = new Array(10).fill(-1);

  for (let i = 0; i < digits.length; i++) {
    buckets[digits[i] - "0"] = i;
  }

  for (let i = 0; i < digits.length; i++) {
    for (let k = 9; k > digits[i] - "0"; k--) {
      // 这个大于current digit的数字比当前index靠后
      if (buckets[k] === -1) {
        continue;
      }
      if (buckets[k] > i) {
        let tmp = digits[i];
        digits[i] = digits[buckets[k]];
        digits[buckets[k]] = tmp;
        return Number(digits.join(""));
      }
    }
  }

  return num;
};

// maximumSwap(2736);
// @lc code=end
