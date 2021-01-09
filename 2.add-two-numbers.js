/*
 * @lc app=leetcode id=2 lang=javascript
 *
 * [2] Add Two Numbers
 */
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
var addTwoNumbers = function (l1, l2) {
  let head = new ListNode(0);
  let tail = head;
  let sum = 0;
  while (l1 !== null || l2 !== null) {
    sum = parseInt(sum / 10);
    if (l1 !== null) {
      sum += l1.val;
      l1 = l1.next;
    }

    if (l2 !== null) {
      sum += l2.val;
      l2 = l2.next;
    }

    tail.next = new ListNode(sum % 10);
    tail = tail.next;
  }

  if (parseInt(sum / 10) == 1) {
    tail.next = new ListNode(1);
  }

  return head.next;
};
