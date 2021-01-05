/*
 * @lc app=leetcode id=307 lang=javascript
 *
 * [307] Range Sum Query - Mutable
 */

// @lc code=start
/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
  this.nums = nums;
};

/**
 * @param {number} i
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function (i, val) {
  this.nums[i] = val;
};

/**
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function (i, j) {
  let sum = 0;
  for (let start = i; i <= j; start++) {
    sum += this.nums[start];
  }

  return sum;
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(i,val)
 * var param_2 = obj.sumRange(i,j)
 */
// @lc code=end
