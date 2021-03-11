/*
 * @lc app=leetcode id=729 lang=javascript
 *
 * [729] My Calendar I
 */

// @lc code=start

// 1. Brute Force
var MyCalendar = function () {
  this.calendar = [];
};

/**
 * @param {number} start
 * @param {number} end
 * @return {boolean}
 */
MyCalendar.prototype.book = function (start, end) {
  for (let iv of this.calendar) {
    if (iv[0] < end && start < iv[1]) return false;
  }
  this.calendar.push([start, end]);
  return true;
};

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */

// 2. Binary Search O(LogN)
var MyCalendar2 = function () {
  this.cal = [];
};

MyCalendar2.prototype.book = function (start, end) {
  let l = 0,
    r = this.cal.length - 1;
  while (l <= r) {
    const mid = Math.floor((r + l) / 2);
    const [s, e] = this.cal[mid];
    if (s < end && start < e) return false;
    if (start >= e) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  this.cal.splice(l, 0, [start, end]);
  return true;
};

// 3. Tree
// @lc code=end
