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
var findMinDifference = function (timePoints) {
  timePoints.sort();
  let ans = Number.MAX_VALUE;
  let t0Minutes = getMinutes(timePoints[0]);
  let preMinutes = t0Minutes;
  for (let i = 1; i < timePoints.length; ++i) {
    const minutes = getMinutes(timePoints[i]);
    ans = Math.min(ans, minutes - preMinutes); // 相邻时间的时间差
    preMinutes = minutes;
  }
  ans = Math.min(ans, t0Minutes + 1440 - preMinutes); // 首尾时间的时间差
  return ans;
};

const getMinutes = (t) => {
  return ((t[0].charCodeAt() - "0".charCodeAt()) * 10 + (t[1].charCodeAt() - "0".charCodeAt())) * 60 + (t[3].charCodeAt() - "0".charCodeAt()) * 10 + (t[4].charCodeAt() - "0".charCodeAt());
};

findMinDifference(["01:01", "02:01"]);
// @lc code=end
