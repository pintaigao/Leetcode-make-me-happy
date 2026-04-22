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

// 给定任意一个根节点，经过这个根节点的最长路径的长度是左子树的最大深度加右子树的最大深度，然后全局的最长路径不一定结果总树的root，
// 但是总会经过某一个子树的跟姐，所以直接后序遍历所有根节点计算经过每个root的最长路径取max
var diameterOfBinaryTree = function (root) {
  let ans = 0;

  function findEachRootMaxDepth(root) {
    if (root === null) {
      return 0;
    }

    let leftMaxDepth = findEachRootMaxDepth(root.left), rightMaxDepth = findEachRootMaxDepth(root.right);
    ans = Math.max(ans, leftMaxDepth + rightMaxDepth);
    return 1 + Math.max(leftMaxDepth, rightMaxDepth);
  }

  findEachRootMaxDepth(root)
  return ans;
};

let diameterOfBinaryTree2 = function (root) {
  let maxDiameter = 0;

  function maxDepth(root) {
    if (root === null) {
      return 0;
    }
    let leftMax = maxDepth(root.left), rightMax = maxDepth(root.right);
    // 后序遍历位置顺便计算最大直径
    maxDiameter = Math.max(maxDiameter, leftMax + rightMax);
    return 1 + Math.max(leftMax, rightMax);
  }

  maxDepth(root);
  return maxDiameter;
}