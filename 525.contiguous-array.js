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
/* Solution 1: HashMap */
let findMaxLength = function (nums) {
  let map = {};
  map[0] = -1;
  let [maxlen, count] = [0, 0];

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
