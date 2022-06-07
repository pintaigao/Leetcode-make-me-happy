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
/* Solution 1: BFS */
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

  for (let k of sortedKeys) {
    output.push(columnTable[k]);
  }

  return output;
};
// @lc code=end
