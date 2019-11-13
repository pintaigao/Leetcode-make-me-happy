/*
 * @lc app=leetcode id=216 lang=javascript
 *
 * [216] Combination Sum III
 */
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
// setp 1: length=k all possible Combination
// setp 2: find length=k all possible Combination, sum = n
// var dfs = (nums, numSetSize, target, index, subset, result) => {
//   if (target < 0 || numSetSize < 0) return;
//   if (target === 0 && subset.length === numSetSize) { result.push([...subset]); return; }

//   for (let i = index; i < nums.length; i++) {
//     subset.push(nums[i]);
//     dfs(nums, numSetSize, target - nums[i], i + 1, subset, result);
//     subset.pop();
//   }

// }
// var combinationSum3 = function (numSetSize, target) {
//   if (numSetSize === 0 || target === 0) { return []; }

//   let result = [];
//   dfs([1, 2, 3, 4, 5, 6, 7, 8, 9], numSetSize, target, 0, [], result);
//   return result;
// };


var combinationSum3 = function (numSetSize, target) {

  if (numSetSize === 0 || target === 0) {
    return [];
  }

  let result = [];
  function dfs(numSetSize, target, nums, subset) {
    if (target < 0) {
      return;
    }
    if (target === 0 && subset.length === numSetSize) {
      result.push(subset.slice());
      return;
    }
    for (let i = nums; i <= 9; i++) {
      subset.push(i);
      dfs(numSetSize, target - i, i + 1, subset);
      subset.pop();
    }
  }

  dfs(numSetSize, target, 1, []);
  return result;
};

console.log(combinationSum3(3, 9));


