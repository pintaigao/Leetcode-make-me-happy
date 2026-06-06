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
var levelOrder = function (root) {
  let res = [];

  function traveler(root, level) {
    if (!root) return;

    if (!res.length || res.length == level) {
      res.push([])
    }

    res[level].push(root.val);

    root.left && traveler(root.left, level + 1);
    root.right && traveler(root.right, level + 1);
  }

  traveler(root, 0);

  return res
}