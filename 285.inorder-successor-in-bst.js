/*
 * @lc app=leetcode id=285 lang=javascript
 *
 * [285] Inorder Successor in BST
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
 * @param {TreeNode} p
 * @return {TreeNode}
 */
// var inorderSuccessor = function (root, p) {
//   if (p.right) {
//     // element is most left of the right sub-tree
//     let subRoot = p.right;
//     while (subRoot.left) {
//       subRoot = subRoot.left;
//     }
//     return subRoot;
//   } else {
//     // element is last "left turned" node
//     let lastLeft = null;
//     let subRoot = root;
//     while (subRoot && (subRoot.val != p.val)) {
//       if (p.val < subRoot.val) {
//         // turning left
//         lastLeft = subRoot;
//         subRoot = subRoot.left;
//       } else {
//         // turning right
//         subRoot = subRoot.right;
//       }
//     }
//     return lastLeft;
//   }
// };
var inorderSuccessor = function (root, p) {
  let stack = [];
  stack.unshift(root);
  let left = root.left;
  while (left) {
    stack.push(left);
    root = root.left;
  }

  while (stack.length) {
    let currentNode = stack.pop();
    if (currentNode.right) {
      let subTree = currentNode.right;
      while (subTree) {
        stack.unshift(subTree);
        subTree = subTree.left;
      }
    }

    if (currentNode === p && stack.length) {
      return stack.shift();
    }
  }
  return null;
}

