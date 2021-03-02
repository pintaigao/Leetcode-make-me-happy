/*
 * @lc app=leetcode id=19 lang=javascript
 *
 * [19] Remove Nth Node From End of List
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */

// Approach 1: Two pass algorithm
var removeNthFromEnd = function (head, n) {
  let dummy = new ListNode(0);
  dummy.next = head;
  let length = 0;
  let first = head;
  while (first != null) {
    length += 1;
    first = first.next;
  }
  length -= n;
  first = dummy;
  while (length > 0) {
    length -= 1;
    first = first.next;
  }
  first.next = first.next.next;
  return dummy.next;
};

// Approach 2
let removeNthFromEnd2 = function (head, n) {
  let dummy = new ListNode(0);
  dummy.next = head;
  let first = dummy;
  let second = dummy;
  // Advances first pointer so that the gap between first and second is n nodes apart
  for (let i = 1; i <= n + 1; i++) {
    first = first.next;
  }
  // Move first to the end, maintaining the gap
  while (first != null) {
    first = first.next;
    second = second.next;
  }
  second.next = second.next.next;
  return dummy.next;
};
// @lc code=end
