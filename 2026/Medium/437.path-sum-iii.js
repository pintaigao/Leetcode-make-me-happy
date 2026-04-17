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

  const traverse = (node) => {
    if (node) {
      check(node, targetSum);
      traverse(node.left);
      traverse(node.right);
    }
  };
  traverse(root);
  return count;
};

/* Solution 2：Map */
var pathSum = function (root, targetSum) {
  let map = { 0: 1 }, total = 0, result = 0;
  traverse(root);

  function traverse(root) {
    if (!root) return;
    // Total 是从根节点一直到现在这个位置的 totalSum，所以 key 等于从根节点到这个位置之间某个位置的sum
    total += root.val;
    let key = total - targetSum;
    if (map[key]) {
      result += map[key];
    }
    // 记录从二叉树的根节点开始到现在这个位置，遇到过的路径和为“pathSum“的所有路径条数
    map[total] = map[total] + 1 || 1;
    traverse(root.left);
    traverse(root.right);
    map[total] = map[total] - 1;
    total -= root.val;
  }

  return result;
};
// @lc code=end
