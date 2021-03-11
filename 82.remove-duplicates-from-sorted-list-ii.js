/*
 * @lc app=leetcode id=82 lang=javascript
 *
 * [82] Remove Duplicates from Sorted List II
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
var deleteDuplicates = function (head) {
  // sentinel
  let sentinel = new ListNode(0, head);

  // predecessor = the last node
  // before the sublist of duplicates
  let pred = sentinel;

  while (head != null) {
    // if it's a beginning of duplicates sublist
    // skip all duplicates
    if (head.next != null && head.val == head.next.val) {
      // move till the end of duplicates sublist
      while (head.next != null && head.val == head.next.val) {
        head = head.next;
      }
      // skip all duplicates
      pred.next = head.next;
      // otherwise, move predecessor
    } else {
      pred = pred.next;
    }

    // move forward
    head = head.next;
  }
  return sentinel.next;
};
// @lc code=end
