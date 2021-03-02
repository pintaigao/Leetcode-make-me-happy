/*
 * @lc app=leetcode id=435 lang=javascript
 *
 * [435] Non-overlapping Intervals
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number}
 */

// Approach #2 Using DP based on starting point
var eraseOverlapIntervals = function (intervals) {
  let isOverlapping = function (j, i) {
    console.log("Let's see if it is overlapping");
    console.log(j);
    console.log(i);
    // 前一个的尾大于后一个的头
    return j[1] > i[0];
  };

  if (intervals.length == 0) {
    return 0;
  }
  intervals.sort((a, b) => {
    return a[1] - b[1];
  });

  console.log(intervals);

  let dp = new Array(intervals.length);
  dp[0] = 1;
  let ans = 1;
  for (let i = 1; i < dp.length; i++) {
    let max = 0;
    for (let j = i - 1; j >= 0; j--) {
      if (!isOverlapping(intervals[j], intervals[i])) {
        max = Math.max(dp[j], max);
        console.log("Max is: " + max);
      }
    }
    dp[i] = max + 1;
    console.log(dp);
    console.log();
    ans = Math.max(ans, dp[i]);
  }
  return intervals.length - ans;
};

eraseOverlapIntervals([
  [1, 2],
  [2, 3],
  [3, 4],
  [1, 3],
]);
// @lc code=end
