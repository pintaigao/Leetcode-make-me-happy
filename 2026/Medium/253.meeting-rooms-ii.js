/*
 * @lc app=leetcode id=253 lang=javascript
 *
 * [253] Meeting Rooms II
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function (intervals) {
  //Base cases
  if (intervals.length === 0) return 0;
  if (intervals.length === 1) return 1;

  const starts = intervals.map((i) => i[0]).sort((a, b) => a - b);
  const ends = intervals.map((i) => i[1]).sort((a, b) => a - b);

  let s = 0;
  let e = 0;
  let total = 0;

  for (let s = 0; s < starts.length; s++) {
    const start = starts[s];
    const end = ends[e];

    if (start >= end) {
      e += 1;
    } else {
      total += 1;
    }
  }

  return total;
};

/* Solution 2: Sort 不懂*/
var minMeetingRooms = function (intervals) {
  intervals.sort((a, b) => (a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]));
  let res = 0;
  intervals.forEach((item, index, arr) => {
    let ans = 0;
    for (let i = 0; i <= index; i++) {
      if (arr[i][1] > item[0]) ans++;
    }
    if (ans > res) res = ans;
  });
  return res;
};

/* Solution 3: Sort */
var minMeetingRooms = function (intervals) {
  if (intervals.length < 2) return 1;
  // 按照开始时间排序
  intervals.sort((a, b) => a[0] - b[0]);

  // 放入第一个会议的结束时间
  let roomTime = [intervals[0][1]];

  // 循环遍历每一个会议
  for (let i = 1; i < intervals.length; i++) {
    let [start, end] = [...intervals[i]];
    // 找到最早的结束时间
    let earliest = Math.min(...roomTime);
    // 如果当前查看的会议的 开始时间 比 最早的结束时间还要早，说明有冲突，如果没有冲突，则替换结束时间
    start < earliest ? roomTime.push(end) : (roomTime[roomTime.indexOf(earliest)] = end);
  }

  // 返回最后的结果
  return roomTime.length;
};

/* Solution 4: 最快的方法 */
var minMeetingRooms = function (intervals) {
  intervals = intervals.sort((a, b) => a[0] - b[0]);
  let rooms = [intervals[0]];

  var getEarliest = function () {
    // 以最早的结束时间排序，返回最早结束的会议
    rooms = rooms.sort((a, b) => a[1] - b[1]);
    return rooms[0];
  };

  for (let i = 1; i < intervals.length; i++) {
    let earliestAvailable = getEarliest();
    let currentInterval = intervals[i];
    if (earliestAvailable[1] <= currentInterval[0]) {
      earliestAvailable[1] = currentInterval[1];
    } else {
      rooms.push(currentInterval);
    }
  }

  return rooms.length;
};
// @lc code=end
