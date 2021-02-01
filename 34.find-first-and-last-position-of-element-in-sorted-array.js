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

// Linear Runtime O(n)
var searchRange = function (nums, target) {
  let targetRange = [-1, -1];

  // find the index of the leftmost appearance of `target`.
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == target) {
      targetRange[0] = i;
      break;
    }
  }

  // if the last loop did not find any index, then there is no valid range
  // and we return [-1, -1].
  if (targetRange[0] == -1) {
    return targetRange;
  }

  // find the index of the rightmost appearance of `target` (by reverse
  // iteration). it is guaranteed to appear.
  for (let j = nums.length - 1; j >= 0; j--) {
    if (nums[j] == target) {
      targetRange[1] = j;
      break;
    }
  }

  return targetRange;
};

// 2. Binary Search
var searchRange2 = function (nums, target) {
  let targetRange = [-1, -1];

  let leftIdx = extremeInsertionIndex(nums, target, true);

  // assert that `leftIdx` is within the array bounds and that `target`
  // is actually in `nums`.
  if (leftIdx == nums.length || nums[leftIdx] != target) {
    return targetRange;
  }

  targetRange[0] = leftIdx;
  targetRange[1] = extremeInsertionIndex(nums, target, false) - 1;

  return targetRange;
};

let extremeInsertionIndex = function (nums, target, left) {
  let lo = 0;
  let hi = nums.length;

  while (lo < hi) {
    let mid = lo + parseInt((hi - lo) / 2);
    if (nums[mid] > target || (left && target == nums[mid])) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }

  return lo;
};

// @lc code=end
