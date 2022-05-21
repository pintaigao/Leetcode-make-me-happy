/*
 * @lc app=leetcode id=437 lang=javascript
 *
 * [437] Path Sum III
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
 * @param {number} targetSum
 * @return {number}
 */
/* Solution 1: 传统的方法 */
var pathSum = function (root, targetSum) {
  let count = 0;
  const check = (node, sum) => {
    if (node) {
      if (node.val === sum) {
        count++;
      }
      check(node.left, sum - node.val);
      check(node.right, sum - node.val);
    }
  };

  const tree = (node) => {
    if (node) {
      check(node, targetSum);
      tree(node.left);
      tree(node.right);
    }
  };
  tree(root);
  return count;
};

/* Solution 2：Map */
var pathSum = function (root, targetSum) {
  let map = new Map();
  map.set(0, 1);
  let total = 0;
  let result = 0;
  helper(root);

  function helper(root) {
    if (!root) return;
    total += root.val;
    let key = total - targetSum;
    if (map.has(key)) {
      result += map.get(key);
    }

    map.set(total, map.get(total) + 1 || 1);
    helper(root.left);
    helper(root.right);
    map.set(total, map.get(total) - 1);

    total -= root.val;
  }

  return result;
};
// @lc code=end
