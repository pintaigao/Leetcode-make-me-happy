/*
 * @lc app=leetcode id=671 lang=javascript
 *
 * [671] Second Minimum Node In a Binary Tree
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
 * @return {number}
 */
// BFS 的方法
var findSecondMinimumValue = function (root) {
  // 最小的一定是root.val
  var [min1, min2, nodes] = [root.val, -1, [root]];
  while (nodes.length > 0) {
    var node = nodes.pop();
    if (node.val > root.val && (node.val < min2 || min2 < 0)) {
      min2 = node.val;
    }
    if (node.left != null) {
      nodes.push(node.left);
    }

    if (node.right != null) {
      nodes.push(node.right);
    }
  }

  return min2 === -1 ? -1 : min2;
};

// 符合题意的方法
var findSecondMinimumValue2 = function (root) {
  let firstbigger = (root, val) => {
    if (!root) return -1;
    if (root.val > val) return root.val;
    let left = firstbigger(root.left, val);
    let right = firstbigger(root.right, val);
    // left = -1说明左子树没有比val大的值，返回右面
    if (left == -1) return right;
    // right = -1说明右子树没有比val大的值，返回左面
    if (right == -1) return left;
    return Math.min(left, right);
  };

  return firstbigger(root, root.val);
};
// @lc code=end
