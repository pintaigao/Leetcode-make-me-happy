/*
 * @lc app=leetcode id=314 lang=javascript
 *
 * [314] Binary Tree Vertical Order Traversal
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
// Approach 1: Breadth-First Search (BFS)
var verticalOrder = function (root) {
  let output = [];
  if (root == null) {
    return output;
  }

  let columnTable = {};
  let queue = [];
  let column = 0;
  queue.unshift([root, column]);

  while (queue.length !== 0) {
    let p = queue.pop();
    root = p[0];
    column = p[1];

    if (root != null) {
      if (!columnTable.hasOwnProperty(column)) {
        columnTable[column] = [];
      }
      columnTable[column].push(root.val);

      queue.unshift([root.left, column - 1]);
      queue.unshift([root.right, column + 1]);
    }
  }

  let sortedKeys = Object.keys(columnTable);
  sortedKeys.sort((a, b) => {
    return Number(a) - Number(b);
  });
  console.log(sortedKeys);
  for (let k of sortedKeys) {
    output.push(columnTable[k]);
  }

  return output;
};

// Approach 2: BFS without sort
let verticalOrder2 = function (root) {
  let output = [];
  if (root == null) {
    return output;
  }

  let columnTable = {};
  // Pair of node and its column offset
  let queue = [];
  let column = 0;
  queue.unshift([root, column]);

  let minColumn = 0,
    maxColumn = 0;

  while (queue.length !== 0) {
    let p = queue.pop();
    root = p[0];
    column = p[1];

    if (root != null) {
      if (!columnTable.hasOwnProperty(column)) {
        columnTable[column] = [];
      }
      columnTable[column].push(root.val);
      minColumn = Math.min(minColumn, column);
      maxColumn = Math.max(maxColumn, column);

      queue.unshift([root.left, column - 1]);
      queue.unshift([root.right, column + 1]);
    }
  }

  for (let i = minColumn; i < maxColumn + 1; ++i) {
    output.push(columnTable[i]);
  }

  return output;
};
// @lc code=end
