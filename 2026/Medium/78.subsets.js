/*
 * @lc app=leetcode id=78 lang=javascript
 *
 * [78] Subsets
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const result = [];

  let dfs = (n, s, curr) => {
    if (curr.length === n) {
      result.push(curr.slice());
      return;
    }

    for (let i = s; i < nums.length; i++) {
      curr.push(nums[i]);
      dfs(n, i + 1, curr);
      curr.pop();
    }
  };

  for (let n = 0; n <= nums.length; n++) {
    // n 表示的是一个数组里面有多少个，讨论
    dfs(n, 0, []);
  }

  return result;
};
// @lc code=end


// 练习
var subsets10 = function (nums) {
  let result = [], path = []

  let dfs = (s) => {
    console.log(path);

    if (s > nums.length) {
      return;
    }

    result.push(path.slice());

    for (let i = s; i < nums.length; i++) {
      path.push(nums[i]);
      dfs(i + 1);
      path.pop();
    }
  };

  dfs(0);

  return result;
};

subsets10([1, 2, 3])
