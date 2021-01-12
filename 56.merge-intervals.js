/*
 * @lc app=leetcode id=56 lang=javascript
 *
 * [56] Merge Intervals
 */
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let result = [];
  let prev = null;
  for (let number of intervals) {
    if (prev === null || number[0] > prev[1]) {
      prev = number;
      result.push(prev);
    } else if (number[1] > prev[1]) {
      prev[1] = number[1];
    }
  }
  return result;
};
