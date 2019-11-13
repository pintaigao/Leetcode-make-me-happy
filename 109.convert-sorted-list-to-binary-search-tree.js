/*
 * @lc app=leetcode id=109 lang=javascript
 *
 * [109] Convert Sorted List to Binary Search Tree
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */

findMidle = (head) => {
  let prev = null;
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  if (prev) {
    prev.next = null;
  }

  return slow;
}

var sortedListToBST = function (head) {
  if (head == null) return null;
  let mid = findMidle(head);
  let node = new TreeNode(mid.val);

  if (head === mid) {
    return node;
  }

  node.left = sortedListToBST(head);
  node.right = sortedListToBST(mid.next);

  return node;
};


