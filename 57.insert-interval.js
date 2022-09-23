/*
 * @lc app=leetcode id=57 lang=javascript
 *
 * [57] Insert Interval
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  let [res, i, len] = [[], 0, intervals.length];

  // 1. 先从左往右看每个区间结束的位置，如果这个位置，比新区间的开始位置要小，则push进result中（说明这个区间和新区间不重叠）
  while (i < len && intervals[i][1] < newInterval[0]) {
    // 当前遍历的是蓝左边的，不重叠的区间
    res.push(intervals[i]);
    i++;
  }

  while (i < len && intervals[i][0] <= newInterval[1]) {
    // 当前遍历是有重叠的区间
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]); //左端取较小者，更新给兰区间的左端
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]); //右端取较大者，更新给兰区间的右端
    i++;
  }

  res.push(newInterval); // 循环结束后，兰区间为合并后的区间，推入res

  while (i < len) {
    // 在蓝右边，没重叠的区间
    res.push(intervals[i]);
    i++;
  }

  return res;
};
// @lc code=end
