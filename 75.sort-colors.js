/*
 * @lc app=leetcode id=75 lang=javascript
 *
 * [75] Sort Colors
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

// Approach 1: One Pass O(N) O(1)
var sortColors = function (nums) {
  // for all idx < i : nums[idx < i] = 0
  // j is an index of element under consideration
  let p0 = 0,
    curr = 0;
  // for all idx > k : nums[idx > k] = 2
  let p2 = nums.length - 1;
  let tmp;

  while (curr <= p2) {
    console.log("curr is:" + curr);
    console.log("and let's see the num:" + nums[curr]);
    if (nums[curr] == 0) {
      // swap p0-th and curr-th elements
      // i++ and j++
      console.log("it is 0 for now: ");
      console.log("Before swap: " + nums);
      tmp = nums[p0];
      nums[p0] = nums[curr];
      nums[curr] = tmp;
      console.log("After swap:" + nums);
      p0 += 1;
      curr += 1;
    } else if (nums[curr] == 2) {
      // swap k-th and curr-th elements
      // p2--
      console.log("it is 2 for now: ");
      console.log("Before swap: " + nums);
      tmp = nums[curr];
      nums[curr] = nums[p2];
      nums[p2] = tmp;
      console.log("After swap:" + nums);
      p2 -= 1;
    } else {
      curr += 1;
    }
    console.log();
  }
};

sortColors([2, 0, 2, 1, 1, 0]);
// @lc code=end
