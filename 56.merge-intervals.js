/*
 * @lc app=leetcode id=56 lang=javascript
 *
 * [56] Merge Intervals
 */
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */

/* Solution 1: Sort the Array first, then compare O(nlogn)&O(1) */
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let result = [];
  let prev = null;
  for (let number of intervals) {
    if (prev === null || number[0] > prev[1]) {
      prev = number;
      result.push(prev);
    } else if (prev[1] < number[0] && number[1] > prev[1]) {
      prev[1] = number[1];
    }
  }
  return result;
};

/* Solution 2: Stack */
var merge2 = function (intervals) {
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
