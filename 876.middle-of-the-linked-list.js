/*
 * @lc app=leetcode id=876 lang=javascript
 *
 * [876] Middle of the Linked List
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
 * @return {ListNode}
 */
// 1. Output to Array O(N) O(N)
var middleNode = function (head) {
  let A = [];
  let t = 0;
  while (head != null) {
    A[t] = head;
    head = head.next;
    t += 1;
  }
  return A[parseInt(t / 2)];
};

// Approach 2: Fast and Slow Pointer O(N) O(1)
let middleNode = function (head) {
  let slow = head,
    fast = head;
  while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};
// @lc code=end
// @lc code=end
