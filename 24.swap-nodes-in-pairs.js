/*
 * @lc app=leetcode id=24 lang=javascript
 *
 * [24] Swap Nodes in Pairs
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

// Approach 1: Recursive Approach
var swapPairs = function (head) {
  // If the list has no node or has only one node left.
  if (head == null || head.next == null) {
    return head;
  }

  // Nodes to be swapped
  let firstNode = head;
  let secondNode = head.next;

  // Swapping
  firstNode.next = swapPairs(secondNode.next);
  secondNode.next = firstNode;

  // Now the head is the second node
  return secondNode;
};

// Approach 2: Iterative Approach
let swapPairs2 = function {
  let dummy = new ListNode(-1);
  dummy.next = head;

  let prevNode = dummy;

  while ((head != null) && (head.next != null)) {

      // Nodes to be swapped
      let firstNode = head;
      let secondNode = head.next;

      // Swapping
      prevNode.next = secondNode;
      firstNode.next = secondNode.next;
      secondNode.next = firstNode;

      // Reinitializing the head and prevNode for next swap
      prevNode = firstNode;
      head = firstNode.next; // jump
  }

  // Return the new head node.
  return dummy.next;
}
// @lc code=end
