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

// 1. Back Tracking
var combinationSum = function (candidates, remain) {
  let results = [];
  let comb = [];

  candidates.sort((a, b) => {
    return a - b;
  });

  let backtrack = function (remain, start) {
    if (remain == 0) {
      // make a deep copy of the current combination
      results.push(comb.slice());
      return;
    }

    for (let i = start; i < candidates.length; ++i) {
      // add  the number into the combination
      if (remain - candidates[i] < 0) {
        break;
      }
      comb.push(candidates[i]);
      backtrack(remain - candidates[i], i);
      // backtrack, remove the number from the combination
      comb.pop();
    }
  };

  backtrack(remain, 0);

  return results;
};

combinationSum([2, 3, 5], 8);

// 待研究的方法
var combinationSum2 = function (candidates, target) {
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
