/*
 * @lc app=leetcode id=303 lang=javascript
 *
 * [303] Range Sum Query - Immutable
 */

// @lc code=start
/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
  this.sums = [0];
  for (let i = 0; i < nums.length; i++) {
    this.sums[i + 1] = this.sums[i] + nums[i];
  }

  console.log(this.sums);
};

/**
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function (i, j) {
  return this.sums[j + 1] - this.sums[i];
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */
// @lc code=end

let example = NumArray([-2, 0, 3, -5, 2, -1]);

// 例子
/* [-2, 0, 3, -5, 2, -1]
 * 每个index+1上的和
 * [0, -2, -2, 1, -4, -2, -3]
 */
