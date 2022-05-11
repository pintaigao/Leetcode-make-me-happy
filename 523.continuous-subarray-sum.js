/*
 * @lc app=leetcode id=523 lang=javascript
 *
 * [523] Continuous Subarray Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function (nums, k) {
  map = {
    0: -1,
  };

  let sum = 0;

  // Loop这个nums
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    console.log(sum);
    if (k != 0) mode = sum % k;
    console.log("After mod k:" + sum);
    let prev = map[mode];
    // 如果prev存在，说明现在这个位置到prev位置的数字之和是k的倍数
    if (prev != null) {
      console.log("Prev is not null and let's see the prev:" + prev);
      if (i - prev >= 2) return true;
    } else {
      map[mode] = i;
    }
    console.log(map);
  }
  return false;
};
// @lc code=end
