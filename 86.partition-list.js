/*
 * @lc app=leetcode id=86 lang=javascript
 *
 * [86] Partition List
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
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  // before and after are the two pointers used to create the two list
  // before_head and after_head are used to save the heads of the two lists.
  // All of these are initialized with the dummy nodes created.
  let before_head = new ListNode(0);
  let before = before_head;
  let after_head = new ListNode(0);
  let after = after_head;

  while (head != null) {
    // If the original list node is lesser than the given x,
    // assign it to the before list.
    if (head.val < x) {
      before.next = head;
      before = before.next;
    } else {
      // If the original list node is greater or equal to the given x,
      // assign it to the after list.
      after.next = head;
      after = after.next;
    }

    // move ahead in the original list
    head = head.next;
  }

  // Last node of "after" list would also be ending node of the reformed list
  after.next = null;

  // Once all the nodes are correctly assigned to the two lists,
  // combine them to form a single list which would be returned.
  before.next = after_head.next;

  return before_head.next;
};
// @lc code=end
