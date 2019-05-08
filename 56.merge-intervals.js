/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let result = [];
  let prev = null;
  for (let index in intervals) {
    if (prev == null || intervals[index][0] > prev[1]) {
      result.push(intervals[index]);
      prev = intervals[index]
    } else if (intervals[index][1] > prev[1]) {
      prev[1] = intervals[index][1];
    }
  }

  console.log(result);
  return result;
};


merge([[1,3],[2,6],[8,10],[15,18]]);

