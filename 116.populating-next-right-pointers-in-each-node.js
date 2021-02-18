/*
 * @lc app=leetcode id=116 lang=javascript
 *
 * [116] Populating Next Right Pointers in Each Node
 */
/**
 * // Definition for a Node.
 * function Node(val,left,right,next) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 *    this.next = next;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */

// 1.传统的做法
var connect = function (root) {
  if (!root) return root;

  if (root.left) root.left.next = root.right;
  if (root.right && root.next) root.right.next = root.next.left;

  connect(root.left);
  connect(root.right);
  return root;
};

// 2.BFS的方法
var connect2 = function (root) {
  if (!root) return;
  const queue = [root];

  while (queue.length) {
    const size = queue.length;
    const level = queue.slice();

    for (let i = 0; i < size; i++) {
      const currentNode = queue.shift();
      currentNode.next = level[i + 1];
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
  }
};
