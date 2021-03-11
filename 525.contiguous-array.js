/*
 * @lc app=leetcode id=525 lang=javascript
 *
 * [525] Contiguous Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

// Brute Force
var findMaxLength = function (nums) {
  let maxlen = 0;
  for (let start = 0; start < nums.length; start++) {
    let zeroes = 0,
      ones = 0;
    for (let end = start; end < nums.length; end++) {
      if (nums[end] == 0) {
        zeroes += 1;
      } else {
        ones += 1;
      }
      if (zeroes == ones) {
        maxlen = Math.max(maxlen, end - start + 1);
      }
    }
  }
  return maxlen;
};

// Approach #3 Using HashMap
let findMaxLength2 = function (nums) {
  let map = {};
  map[0] = -1;
  let maxlen = 0,
    count = 0;

  for (let i = 0; i < nums.length; i++) {
    count = count + (nums[i] == 1 ? 1 : -1);
    if (map.hasOwnProperty(count)) {
      maxlen = Math.max(maxlen, i - map[count]);
    } else {
      map[count] = i;
    }
  }
  return maxlen;
};
// @lc code=end
