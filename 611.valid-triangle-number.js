/*
 * @lc app=leetcode id=611 lang=javascript
 *
 * [611] Valid Triangle Number
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

/* 1.暴力解法：任意两边之和大于第三边 */
var triangleNumber = function (nums) {
  let count = 0;
  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        // 任意两边之和大于第三边
        if (nums[i] + nums[j] > nums[k] && nums[i] + nums[k] > nums[j] && nums[j] + nums[k] > nums[i]) count += 1;
      }
    }
  }
  return count;
};

/* Sort + Binary Search O(n^2logn) O(logn) sort O(logn) space*/
let triangleNumber2 = function (nums) {
  let binarySearch = function (l, r, x) {
    while (r >= l && r < nums.length) {
      let mid = parseInt((l + r) / 2);
      if (nums[mid] >= x) r = mid - 1;
      // l = mid+1，而不是l = mid，因为当查找的数组里面只有两个数时，after计算出mid，l已经是mid了
      else l = mid + 1;
    }
    return l;
  };

  let count = 0;
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    let k = i + 2;
    for (let j = i + 1; j < nums.length - 1 && nums[i] != 0; j++) {
      k = binarySearch(k, nums.length - 1, nums[i] + nums[j]);
      count += k - j - 1;
    }
  }
  return count;
};

// Approach 3: Linear Scan O(n^2) O(logn) 就是k一直传下去
let triangleNumber3 = function (nums) {
  let count = 0;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; i++) {
    let k = i + 2;
    for (let j = i + 1; j < nums.length - 1 && nums[i] != 0; j++) {
      while (k < nums.length && nums[i] + nums[j] > nums[k]) {
        // 找第一个nums[i] + nums[j] <= nums[k]
        k += 1;
      }
      count += k - j - 1;
    }
  }
  return count;
};
// @lc code=end
