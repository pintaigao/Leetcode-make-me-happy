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

  let l = 0, r = nums.length - 1; //二分范围
  //第一次二分，查找元素的开始位置
  while (l < r) {
    let mid = Math.floor((l + r) / 2);
    if (nums[mid] >= target) r = mid;
    else l = mid + 1;
  }
  if (nums[r] != target) return [-1, -1]; //查找失败
  let L = r;
  // reset二分范围
  l = 0, r = nums.length - 1;
  //第二次二分，查找元素的结束位置
  while (l < r) {
    let mid = Math.floor((l + r + 1) / 2);
    if (nums[mid] <= target) l = mid;
    else r = mid - 1;
  }
  return [L, r];
};
// @lc code=end

// 同样是两个的二分查找
var searchRange = function (nums, target) {
  // 返回目标值的搜索范围
  return [left_bound(nums, target), right_bound(nums, target)];
};

function left_bound(nums, target) {
  let left = 0, right = nums.length - 1;
  // 搜索区间为 [left, right]
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] < target) {
      // 搜索区间变为 [mid+1, right]
      left = mid + 1;
    } else if (nums[mid] > target) {
      // 搜索区间变为 [left, mid-1]
      right = mid - 1;
    } else if (nums[mid] === target) {
      // 收缩右侧边界
      right = mid - 1;
    }
  }
  // 检查出界情况
  if (left >= nums.length || nums[left] !== target) {
    return -1;
  }
  return left;
}

function right_bound(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] === target) {
      // 这里改成收缩左侧边界即可
      left = mid + 1;
    }
  }
  // 这里改为检查 right 越界的情况，见下图
  if (right < 0 || nums[right] !== target) {
    return -1;
  }
  return right;
}
