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
/* Solution 1: DP */
var minSteps = function (n) {
  // DP Array 表示的是，每个index代表A的个数，对应的value为最小操作值
  let dp = new Array(n + 1).fill(0);

  // 从第二个A开始看
  for (let i = 2; i <= n; i++) {
    // 最直接的，一直paste一个A
    dp[i] = i;
    // if sequence of length 'j' can be pasted multiple times to get length 'i' sequence
    // 看前面的情况
    for (let j = i - 1; j > 1; j--) {
      if (i % j == 0) {
        /// we just need to paste sequence j (i/j - 1) times, hence additional (i/j) times since we need to copy it first as well.
        // we don't need checking any smaller length sequences
        // 比如9个A，可以从3个A copy一次，paste两次得到9个A，所以要paste i/j - 1次，但是之前要copy一次，所以为i/j - 1 + 1
        dp[i] = dp[j] + (i / j - 1 + 1);
        break;
      }
    }
  }
  return dp[n];
};

/* Solution 2: DP2 */
let minSteps = function (n) {
  const f = new Array(n + 1).fill(0);

  for (let i = 2; i <= n; ++i) {
    f[i] = n;
    for (let j = 1; j * j <= i; ++j) {
      if (i % j === 0) {
        f[i] = Math.min(f[i], Math.floor(f[j] + i / j));
        f[i] = Math.min(f[i], Math.floor(f[i / j] + j));
      }
    }
  }
  return f[n];
};
// @lc code=end
