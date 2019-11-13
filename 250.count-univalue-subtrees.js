/*
 * @lc app=leetcode id=250 lang=javascript
 *
 * [250] Count Univalue Subtrees
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// var countUnivalSubtrees = function (root, count = 0) {
//   if(!root) {
//     return count;
//   }
//   if (isSame(root)) count++;
//   count = countUnivalSubtrees(root.left, count);
//   count = countUnivalSubtrees(root.right, count);
//   return count;
// };

// let isSame = function (root) {
//   if(!root) return true;
//   if(root.left && root.left.value !== root.val) return false;
//   if(root.right && root.right.value !== root.val) return false;
//   return isSame(root.left) && isSame(root.right);
// }


var countUnivalSubtrees = function (root) {
  let result = 0;
  function helper(root) {
    if (!root) return true;

    let left = helper(root.left);
    let right = helper(root.right);

    if (left && right) {
      if ((root.left && root.val !== root.left.val) || (root.right && root.val !== root.right.val)) {
        return false;
      }
      result += 1;
      return true;
    }
    return false;
  }
  helper(root);
  return result;
}

