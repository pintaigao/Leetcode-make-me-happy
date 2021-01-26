/*
 * @lc app=leetcode id=445 lang=javascript
 *
 * [445] Add Two Numbers II
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

// /* 1. 我自己的solution，把两个都反转了？然后从后往前？carrier？*/
// var addTwoNumbers = function (l1, l2) {

// };

/* 2. Using Stack O(n) */
var addTwoNumbers = function (l1, l2) {
  let s1 = [];
  let s2 = [];

  while (l1) {
    s1.unshift(l1.val);
    l1 = l1.next;
  }
  while (l2) {
    s2.unshift(l2.val);
    l2 = l2.next;
  }

  let sum = 0;
  let list = new ListNode(0);
  while (s1.length || s2.length) {
    if (s1.length) sum += s1.shift();
    if (s2.length) sum += s2.shift();
    list.val = sum % 10;
    /* 这里，为什么initiate的时候要放sum/10而不是直接放0 */
    let head = new ListNode(Math.floor(sum / 10));
    head.next = list;
    list = head;
    sum = Math.floor(sum / 10);
  }

  // 这个解释了上面new ListNode里面为什么要计算
  return list.val == 0 ? list.next : list;
};
// @lc code=end
