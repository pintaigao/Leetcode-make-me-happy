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
  const [res, path, used] = [[], [], []];
  backtracking();
  return res;

  function backtracking() {
    if (path.length === nums.length) {
      res.push(path.slice());
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      path.push(nums[i]);
      used[i] = true; // 同支
      backtracking();
      path.pop();
      used[i] = false;
    }
  }
};
// @lc code=end
