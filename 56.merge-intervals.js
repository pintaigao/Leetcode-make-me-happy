/*
 * @lc app=leetcode id=56 lang=javascript
 *
 * [56] Merge Intervals
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
/* Sort的方法 */
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let result = [];
  for (let number of intervals) {
    // 当结果为空时，又或者当前区间的起始位置 > 结果数组中最后区间的end time时，
    if (!result.length || number[0] > result[result.length - 1][1]) {
      // 放入新的区间
      result.push(number);
    } else {
      // else 就是当前区间的起始位置 <= 结果数组中最后区间的end time时,说明重叠了，看看是当前区间的end time大还是结果数组中最后区间的end time大
      result[result.length - 1][1] = Math.max(result[result.length - 1][1], number[1]);
    }
  }
  return result;
};

/* Solution 2: Stack */
var merge = function (intervals) {
  if (intervals.length < 1) return [];
  // sort intervals ascending by start time
  intervals.sort((a, b) => a[0] - b[0]);
  let stack = [intervals[0]];
  // check each interval
  for (let [start, end] of intervals) {
    // if overlap exists between current and last interval end-time
    // The last interval in stack will always be before curr interval.
    // so we check if curr interval start time is <= the last intervals end time
    if (start <= stack[stack.length - 1][1]) {
      // merge intervals and add to result
      const [startPrev, endPrev] = stack.pop();
      stack.push([startPrev, Math.max(end, endPrev)]);
    } else {
      stack.push([start, end]);
    }
  }
  return stack;
};
// @lc code=end
