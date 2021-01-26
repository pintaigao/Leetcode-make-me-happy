/*
 * @lc app=leetcode id=46 lang=javascript
 *
 * [46] Permutations
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const res = [];
  backtrack(nums, res);
  return res;
};

function backtrack(nums, res, n = 0) {
  if (n === nums.length - 1) {
    res.push([...nums]);
    return;
  }
  for (let i = n; i < nums.length; i++) {
    swap(nums, n, i);
    backtrack(nums, res, n + 1);
    swap(nums, n, i);
  }
}

function swap(arr, index1, index2) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

permute([1, 2, 3]);
// @lc code=end
