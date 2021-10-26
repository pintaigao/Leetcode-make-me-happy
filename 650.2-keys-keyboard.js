/*
 * @lc app=leetcode id=650 lang=javascript
 *
 * [650] 2 Keys Keyboard
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */

// DP
var minSteps = function (n) {
  let dp = new Array(n + 1).fill(0);

  for (let i = 2; i <= n; i++) {
    dp[i] = i;
    // if sequence of length 'j' can be pasted multiple times to get length 'i' sequence
    for (let j = i - 1; j > 1; j--) {
      if (i % j == 0) {
        /// we just need to paste sequence j (i/j - 1) times, hence additional (i/j) times since we need to copy it first as well.
        // we don't need checking any smaller length sequences
        // -1 是多出来的那个，+1是copy操作
        dp[i] = dp[j] + (i / j - 1 + 1);
        break;
      }
    }
  }
  return dp[n];
};
// @lc code=end
