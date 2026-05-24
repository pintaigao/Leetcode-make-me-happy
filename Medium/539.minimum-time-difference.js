/*
 * @lc app=leetcode id=539 lang=javascript
 *
 * [539] Minimum Time Difference
 */

// @lc code=start
/**
 * @param {string[]} timePoints
 * @return {number}
 */
/* Solution 1: Fixed Array */
var findMinDifference = function (timePoints) {
  let mark = new Array(24 * 60).fill(false);

  // 在24*60长度的数组中标记出每个时间点
  for (let time of timePoints) {
    let t = time.split(":");
    let h = parseInt(t[0]);
    let m = parseInt(t[1]);

    // 如果有两个时间是一样的，返回0
    if (mark[h * 60 + m]) {
      return 0;
    }
    mark[h * 60 + m] = true;
  }

  let [minResult, first, prev, last] = [Number.MAX_VALUE, undefined, undefined, undefined];
  // 到目前为止的一定保证了每个时间都只出现了一次
  for (let i = 0; i < 24 * 60; i++) {
    if (mark[i]) {
      if (first === undefined) {
        first = i;
      }

      if (prev) {
        minResult = Math.min(minResult, i - prev);
      }

      prev = i;
      last = i;
    }
  }

  return Math.min(minResult, 24 * 60 - last + first);
};

/* Solution 2: Sorted */
let findMinDifference = function (timePoints) {
  timePoints = timePoints.map(time => {
    let [hour, minute] = time.split(":").map((num) => Number(num));
    console.log([hour, minute]);
    return hour * 60 + minute;
  });

  timePoints.sort((a, b) => a - b);
  let result = Number.MAX_VALUE;

  for (let i = 1; i < timePoints.length; i++) {
    result = Math.min(result, timePoints[i] - timePoints[i - 1]);
  }

  // check first and last
  return Math.min(result, timePoints[0] + 24 * 60 - timePoints[timePoints.length - 1]);
};
// @lc code=end

// 练习：
let findMinDifference10 = function (timePoints) {
  timePoints = timePoints.map(time => {
    let [hour, minute] = time.split(":").map((num) => Number(num));
    console.log([hour, minute]);
    return hour * 60 + minute;
  });

  timePoints.sort((a, b) => a - b);
  let result = Number.MAX_VALUE;

  for (let i = 1; i < timePoints.length; i++) {
    result = Math.min(result, timePoints[i] - timePoints[i - 1]);
  }

  // check first and last
  return Math.min(result, timePoints[0] + 24 * 60 - timePoints[timePoints.length - 1]);
};

findMinDifference10(["12:12", "12:13", "00:12", "00:13"])
