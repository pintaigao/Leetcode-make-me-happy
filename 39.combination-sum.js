/*
 * @lc app=leetcode id=39 lang=javascript
 *
 * [39] Combination Sum
 */
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  let result = [];

  function dfs(current, startIndex, currentSum) {
    if (currentSum == target) {
      result.push(current);
      return;
    }
    if (currentSum > target) {
      return;
    }
    for (let i = startIndex; i < candidates.length; i++) {
      dfs(current.concat(candidates[i]), i, currentSum + candidates[i]);
    }
  }

  dfs([], 0, 0);
  return result;
};

