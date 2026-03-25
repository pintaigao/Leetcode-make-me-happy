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
 * @param {number} target
 * @return {number}
 */
var closestValue = function (root, target) {
  res = root.val;
  traverse(root, target);
  return res;

  // 遍历函数，在 BST 中搜索 target
  function traverse(root, target) {
    if (root == null) {
      return;
    }
    // 一边搜索一边更新离 target 最近的值
    if (Math.abs(root.val - target) < Math.abs(res - target)) {
      res = root.val;
    }
    // 根据 target 和 root.val 的相对大小决定去左右子树搜索
    // 如果 target 比 root.val 大，说明 target 在右子树，反之在左子树
    if (root.val < target) {
      traverse(root.right, target);
    } else {
      traverse(root.left, target);
    }
  }
};


// 练习
let closestValue = function (root, target) {

  let res = root.val;

  function traverse(root) {
    if (root == null) {
      return;
    }


    if (Math.abs(root.val - target) < Math.abs(res - target)) {
      res = root.val;
    }

    if (root.val < target) {
      traverse(root.right, target);
    } else {
      traverse(root.left, target);
    }
  }

  traverse(root);

  return res;
}