/*
 * @lc app=leetcode id=729 lang=javascript
 *
 * [729] My Calendar I
 */

// @lc code=start

// 1.暴力法
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

// 2.平衡二叉树
var MyCalendar = function () {
  this.root = null;
};

MyCalendar.prototype.book = function (start, end) {
  if (this.root === null) {
    this.root = new TreeNode(start, end);
    return true;
  }
  return this.root.insert(new TreeNode(start, end));
};

class TreeNode {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.left = null;
    this.right = null;
  }

  insert(node) {
    if (node.start >= this.end) {
      if (this.right === null) {
        this.right = node;
        return true;
      }
      return this.right.insert(node);
    } else if (node.end <= this.start) {
      if (this.left === null) {
        this.left = node;
        return true;
      }
      return this.left.insert(node);
    }
    return false;
  }
}

// 3.二分查找
var MyCalendar2 = function () {
  this.cal = [];
};

MyCalendar2.prototype.book = function (start, end) {
  let [l, r] = [0, this.cal.length - 1];
  while (l <= r) {
    const mid = Math.floor((r + l) / 2);
    const [s, e] = this.cal[mid];
    //
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

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */
// @lc code=end
