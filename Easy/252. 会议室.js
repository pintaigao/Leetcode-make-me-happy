/**
 * @param {number[][]} intervals
 * @return {boolean}
 */

// 字面上的意思是：如果能参加所有会议，则后一个会议的开始时间必须大于等于前一个会议的结束时间。
var canAttendMeetings = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) {
      return false;
    }
  }
  return true;
};