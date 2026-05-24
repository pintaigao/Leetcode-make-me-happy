/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// 二分查找法
var searchInsert = function (nums, target) {
  // 搜索左侧边界的二分算法
  if (nums.length === 0) return -1;
  let left = 0, right = nums.length;
  // 注意
  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) {
      right = mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      // 注意
      right = mid;
    }
  }
  return left;
};