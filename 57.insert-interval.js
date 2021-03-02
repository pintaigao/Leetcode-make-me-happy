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
// 中规中矩的方法O(n) O(n)
var insert = function (intervals, newInterval) {
  // init data
  let newStart = newInterval[0],
    newEnd = newInterval[1];
  let index = 0,
    n = intervals.length;
  let output = [];

  // add all intervals starting before newInterval
  while (index < n && newStart > intervals[index][0]) {
    output.push(intervals[index]);
    index += 1;
  }

  // console.log(output);

  // add newInterval
  let interval = [];
  // if there is no overlap, just add the interval
  if (output.length == 0 || output[output.length - 1][1] < newStart)
    output.push(newInterval);
  // if there is an overlap, merge with the last interval
  else {
    output[output.length - 1][1] = Math.max(
      output[output.length - 1][1],
      newEnd
    );
  }

  // console.log(output);

  // add next intervals, merge with newInterval if needed
  while (index < n) {
    interval = intervals[index];
    let start = interval[0],
      end = interval[1];
    // if there is no overlap, just add an interval
    if (output[output.length - 1][1] < start) output.push(interval);
    // if there is an overlap, merge with the last interval
    else {
      output[output.length - 1][1] = Math.max(
        output[output.length - 1][1],
        end
      );
    }
    index += 1;
  }

  // console.log(output);
  return output;
};

// insert(
//   [
//     [1, 2],
//     [3, 5],
//     [6, 7],
//     [8, 10],
//     [12, 16],
//   ],
//   [4, 8]
// );

// Approach 2: Pretty Straight Forward
let insert2 = function (intervals, newInterval) {
  let result = [];
  let i = 0;
  let start = newInterval[0];
  let end = newInterval[1];

  while (i < intervals.length && intervals[i][1] < start) {
    result.push(intervals[i]);
    i += 1;
  }

  while (i < intervals.length && intervals[i][0] <= end) {
    start = Math.min(start, intervals[i][0]);
    end = Math.max(end, intervals[i][1]);
    i += 1;
  }
  result.push([start, end]);

  while (i < intervals.length) {
    result.push(intervals[i]);
    i += 1;
  }

  return result;
};

// @lc code=end
