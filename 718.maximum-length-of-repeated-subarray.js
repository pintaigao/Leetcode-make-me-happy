/*
 * @lc app=leetcode id=718 lang=javascript
 *
 * [718] Maximum Length of Repeated Subarray
 */

// @lc code=start
/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */

// Approach #3: Dynamic Programming [Accepted]
var findLength = function (A, B) {
  let ans = 0;
  let memo = new Array(A.length + 1).fill(null).map((pos) => {
    return new Array(B.length + 1).fill(0);
  });

  for (let i = A.length - 1; i >= 0; --i) {
    for (let j = B.length - 1; j >= 0; --j) {
      if (A[i] == B[j]) {
        console.log("i is:" + i);
        console.log("j is:" + j);
        memo[i][j] = memo[i + 1][j + 1] + 1;
        console.log(memo);
        if (ans < memo[i][j]) ans = memo[i][j];
      }
    }
  }
  return ans;
};

findLength([1, 2, 3, 2, 1], [3, 2, 1, 4, 7]);
// @lc code=end
