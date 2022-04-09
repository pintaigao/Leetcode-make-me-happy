/*
 * @lc app=leetcode id=989 lang=javascript
 *
 * [989] Add to Array-Form of Integer
 */

// @lc code=start
/**
 * @param {number[]} num
 * @param {number} k
 * @return {number[]}
 */
var addToArrayForm = function (A, K) {
  let index = A.length - 1;
  let cur = K;
  let ans = [];

  while (index >= 0 || cur > 0) {
    if (index >= 0) cur += A[index];
    // console.log("After sum up:");
    // console.log(cur);
    ans.push(cur % 10);
    cur = parseInt(cur / 10);
    // console.log(cur);
    index -= 1;
  }

  ans.reverse();
  return ans;
};

// @lc code=end
