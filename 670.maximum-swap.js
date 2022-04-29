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
/* Greedy的方法 */
var maximumSwap = function (num) {
  let digits = (num + "").split("");

  let buckets = new Array(10).fill(-1);

  // 记录每个数字出现的位置 index表示数字，value表示出现的位置
  for (let i = 0; i < digits.length; i++) {
    buckets[digits[i] - "0"] = i;
  }

  // 从左向右扫描，找到当前位置右边的最大的数字并交换
  for (let i = 0; i < digits.length; i++) {
    // 找最大，所以倒着找
    for (let k = 9; k > digits[i] - "0"; k--) {
      if (buckets[k] === -1) {
        continue;
      }
      // 如果比当前大的数字的位置靠后，交换
      if (buckets[k] > i) {
        // 交换
        let tmp = digits[i];
        digits[i] = digits[buckets[k]];
        digits[buckets[k]] = tmp;
        return Number(digits.join(""));
      }
    }
  }

  return num;
};
// @lc code=end
