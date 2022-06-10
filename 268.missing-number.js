/*
 * @lc app=leetcode id=268 lang=javascript
 *
 * [268] Missing Number
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

/* Set的做法 */
var missingNumber = function (nums) {
  let numSet = new Set();
  for (let num of nums) numSet.add(num);

  let expectedNumCount = nums.length + 1;
  for (let number = 0; number < expectedNumCount; number++) {
    if (!numSet.has(number)) {
      return number;
    }
  }
  return -1;
};

/* 差值 */
var missingNumber = function (nums) {
  let n = nums.length;
  let [cur, sum] = [0, (n * (n + 1)) / 2];
  for (let i of nums) cur += i;
  return sum - cur;
};

/*  */
// @lc code=end
