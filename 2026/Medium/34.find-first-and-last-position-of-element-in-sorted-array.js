/*
 * @lc app=leetcode id=34 lang=javascript
 *
 * [34] Find First and Last Position of Element in Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  if (nums.length == 0) return [-1, -1];

  let [l, r] = [0, nums.length - 1]; //二分范围
  //第一次二分，查找元素的开始位置
  while (l < r) {
    let mid = Math.floor((l + r) / 2);
    if (nums[mid] >= target) r = mid;
    else l = mid + 1;
  }
  if (nums[r] != target) return [-1, -1]; //查找失败

  let L = r;
  [l, r] = [0, nums.length - 1]; //二分范围
  //第二次二分，查找元素的结束位置
  while (l < r) {
    let mid = Math.floor((l + r + 1) / 2);
    if (nums[mid] <= target) l = mid;
    else r = mid - 1;
  }
  return [L, r];
};
// @lc code=end
