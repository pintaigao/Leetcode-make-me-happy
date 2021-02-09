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

  let runningSum = 0;

  // Loop这个nums
  for (let i = 0; i < nums.length; i++) {
    runningSum += nums[i];
    console.log(runningSum);
    if (k != 0) runningSum %= k;
    console.log("After mod k:" + runningSum);
    let prev = map[runningSum];
    if (prev != null) {
      console.log("Prev is not null and let's see the prev:" + prev);
      if (i - prev > 1) continue;
    } else map[runningSum] = i;
    console.log(map);
  }
  return false;
};

checkSubarraySum([23, 2, 4, 6, 7], 6);
// @lc code=end
