/*
 * @lc app=leetcode id=938 lang=javascript
 *
 * [938] Range Sum of BST
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
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
// 简单的遍历
// 关键是什么情况下要往左走，什么情况下要往右走，还有用什么遍历方法
var rangeSumBST = function (root, low, high) {
  let sum = 0;
  if (root == null) {
    return 0;
  }

  // 如果这个节点（root.val）的值在范围内，则加上这个节点的值
  if (root.val >= low && root.val <= high) {
    sum = root.val;
  }

  // 如果现在的节点的值比范围的最小值大， 或者现在的值比范围的最大值大，则往左子树走
  if (low <= root.val || high <= root.val) {
    sum += rangeSumBST(root.left, low, high);
  }

  // 如果现在的节点的值比范围的最小值小（说明右子树的值比现在的大），或者现在的值比范围的最大值小（说明右边还有），则往右子树走
  if (root.val <= low || root.val <= high) {
    sum += rangeSumBST(root.right, low, high);
  }
  return sum;
};

// BFS的方法
var rangeSumBST = function (root, low, high) {
  let sum = 0;
  const q = [root];
  while (q.length) {
    const node = q.shift();
    if (!node) {
      continue;
    }
    if (node.val > high) {
      q.push(node.left);
    } else if (node.val < low) {
      q.push(node.right);
    } else {
      // 如果这个节点（root.val）的值在范围内，则加上这个节点的值
      sum += node.val;
      q.push(node.left);
      q.push(node.right);
    }
  }
  return sum;
};
// @lc code=end
